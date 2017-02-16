var express = require('express');
var http = require('http');
var request = require('request');
var router = express.Router();
var async = require('async');
var querystring = require('querystring');
var jwt = require('jsonwebtoken');
var config = require('../config');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.html');
});

// route to verify user
router.post('/verify', function (req, res, next) {
    const token = req.cookies['SEEK_THEM_COOKIE'];
    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            "use strict";
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'failed to authenticate'
                });
            } else if(decoded.role == 'PUBLIC' || decoded.role == 'MOTOR' || decoded.role == 'NIC' || decoded.role == 'LICENSE' || decoded.role == 'ADMIN'){
                res.json({
                    role: decoded.role
                });
            } else
                return res.status(403).send({
                    success: false,
                    message: 'not authorized'
                });
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'no identity provided.'
        });
    }
});

// middleware protect api
router.use(function (req, res, next) {
    const token = req.cookies['SEEK_THEM_COOKIE'];
    if (token) {
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            "use strict";
console.log(decoded.role);
            if (err) {
                return res.status(403).json({
                success: false,
                message: 'failed to authenticate'
                });
            } else if(decoded.role == 'PUBLIC'|| decoded.role == 'MOTOR' || decoded.role == 'NIC' || decoded.role == 'LICENSE' || decoded.role == 'ADMIN'){
                req.decoded = decoded;
                next();
            } else
            return res.status(403).send({
                success: false,
                message: 'Not Authorized'
            });
        });
    } else {
        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'no identity provided.'
        });
    }
});

/* GET Merged n Aggregated SocialMedia Profiles*/
router.post('/search-social', function(req, res, next) {
    async.parallel({
        socialMedia: function(callback) {
            var options = {
                host: 'localhost',
                port: 5000,
                path: '/match?name=' + req.body.user.name,
                method: 'GET'
            };

            console.log("Calling Social API");
            socialCallback = function(response) {
                var socialProfiles = '';

                //another chunk of data has been recieved, so append it to `str`
                response.on('data', function (profile) {
                    socialProfiles += profile;
                });

                //the whole response has been recieved, so we just print it out here
                response.on('end', function () {
                    //console.log(socialProfiles);
                    console.log("Recieved Social Results");
                    callback(null, socialProfiles );
                });
            };

            http.request(options, socialCallback).end();
        }
    }, function(err, results) {  // after matching social media profiles
        if (err)
            res.send(err);

        console.log(results);
        // modifying merged profiles to match with aggregation system
        const socialMediaProfiles = results['socialMedia']['mergedSocialMediaAccounts'];
        let temp;
        let mergedProfiles;
        socialMediaProfiles.forEach(function (socialMediaProfile) {
            temp = {
                "socialMedia" : socialMediaProfile
            };
            mergedProfiles.push(temp);
        });

        const aggregationReadyProfiles = {
            "profiles" : mergedProfiles
        };
        console.log(aggregationReadyProfiles);

        request({  // calling aggregation system
            method: 'POST',
            url: "http://localhost:8080/FYPAsid/rest/UserService/user/aggregation",
            body: aggregationReadyProfiles,
            json: true,
            headers: {
                'Content-Type': 'application/json',
            }

        }, (error, aggregatedProfiles, body) => {
            if (error){
                console.log("ERROR AT AGGREGATION");
                console.log(error);
            } else{
                console.log("Recieved Aggregation Results");
                console.log(JSON.stringify(aggregatedProfiles.body));
                console.log("Calling Suggestion API");
                const params = {};
                params.school = req.body.user.school;
                params.workPlace = req.body.user.workPlace;
                params.city = req.body.user.city;
                params.name = req.body.user.name;
                params.role = req.decoded.role;
                //console.log(params);
                params.profiles = aggregatedProfiles.body.profiles;
                console.log(JSON.stringify(params));

                request({  // calling suggesting system
                    method: 'POST',
                    url: "http://localhost:8080/FYPAsid/rest/UserService/suggestion",
                    body: params,
                    json: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }

                }, (error, profiles, body) => {
                    if (error){
                        console.log("ERROR AT SUGGESTION");
                        console.log(error);
                    } else{
                        console.log(profiles.body);
                        console.log("Recieved Suggestion Results");
                        res.json(profiles.body);
                    }
                }); // end of suggestion
            }
        }); // end of aggregation
    });
});

/* GET Merged SocialMedia n Government Profiles*/
router.post('/search', function(req, res, next) {
    async.parallel({
        government: function(callback) {
                var options = {
                    host: 'localhost',
                    port: 8080,
                    path: '/FYPAsid/rest/UserService/user?name=' + req.body.user.name,
                    method: 'GET'
                };
		console.log("Calling Gov API");
                govCallback = function(response) {
                    var govProfiles = '';

                    //another chunk of data has been recieved, so append it to `str`
                    response.on('data', function (profile) {
                        govProfiles += profile;
                    });

                    //the whole response has been recieved, so we just print it out here
                    response.on('end', function () {
                        //console.log(govProfiles);
			console.log("Recieved Gov Results");
                        callback(null, govProfiles );
                    });
                };

                http.request(options, govCallback).end();
        },
        socialMedia: function(callback) {
            var options = {
                host: 'localhost',
                port: 5000,
                path: '/match?name=' + req.body.user.name,
                method: 'GET'
            };
	
	    console.log("Calling Social API");
            socialCallback = function(response) {
                var socialProfiles = '';

                //another chunk of data has been recieved, so append it to `str`
                response.on('data', function (profile) {
                    socialProfiles += profile;
                });

                //the whole response has been recieved, so we just print it out here
                response.on('end', function () {
                    //console.log(socialProfiles);
		    console.log("Recieved Social Results");
                    callback(null, socialProfiles );
                });
            };

            http.request(options, socialCallback).end();
        }
    }, function(err, results) {  // after matching social media and and government profiles
        if (err)
            res.send(err);

	console.log("Calling FaceRecognition API");
	console.log(results);
        request({  // calling face recognition system
            method: 'POST',
            url: "http://localhost:4000/facerecognizer/merge",
            json: true,
            body: results,
            headers: {
                'Content-Type': 'application/json',
            }

        }, (error, mergedProfiles, body) => {
            if (error){
            console.log("ERROR AT FACERECOGNITION")
                    console.log(error);
            }
            else{
		console.log("Recieved FaceRecognition Results");
		console.log(JSON.stringify(mergedProfiles.body));
		console.log("Calling Aggregation API");
                request({  // calling aggregation system
            		method: 'POST',
                    url: "http://localhost:8080/FYPAsid/rest/UserService/user/aggregation",
                    body: mergedProfiles.body,
                    json: true,
                    headers: {
                      'Content-Type': 'application/json',
                    }

   	             }, (error, aggregatedProfiles, body) => {
                  if (error){
			//console.log(aggregatedProfiles.body);
                    console.log("ERROR AT AGGREGATION");
                    console.log(error);
                  } else{
			console.log("Recieved Aggregation Results");
			console.log(JSON.stringify(aggregatedProfiles.body));
		      console.log("Calling Suggestion API");
                      const params = {};
                      params.school = req.body.user.school;
                      params.workPlace = req.body.user.workPlace;
                      params.city = req.body.user.city;
		      params.name = req.body.user.name;
		      params.role = req.decoded.role;
		      //console.log(params);
                      params.profiles = aggregatedProfiles.body.profiles;
		      console.log(JSON.stringify(params));

                      request({  // calling suggesting system
                          method: 'POST',
                          url: "http://localhost:8080/FYPAsid/rest/UserService/suggestion",
                          body: params,
                          json: true,
                          headers: {
                              'Content-Type': 'application/json',
                          }

                      }, (error, profiles, body) => {
                          if (error){
                              console.log("ERROR AT SUGGESTION");
                              console.log(error);
                          } else{
				console.log(profiles.body);
			      console.log("Recieved Suggestion Results");
                              res.json(profiles.body);
                          }
                      }); // end of suggestion
                  }
                }); // end of aggregation
            }
        }); //end of face recognition
    });
});


module.exports = router;
