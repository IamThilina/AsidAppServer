var express = require('express');
var http = require('http');
var router = express.Router();
var async = require('async');
var querystring = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Test SocialMediaProfile Matcher Route */
router.get('/socialmedia/test', function(req, res, next) {

    var options = {
        host: 'localhost',
        port: 5000,
        path: '/demo?name=' + req.query.name,
        method: 'GET'
    };

    callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            console.log(str);
            res.send(str);
        });
    };

    http.request(options, callback).end();
});

/* Test GovernmentProfile Matcher Route */
router.get('/government/test', function(req, res, next) {

    var options = {
        host: 'localhost',
        port: 8080,
        path: '/FYPAsid/rest/UserService/user?name=' + req.query.name,
        method: 'GET'
    };

    callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
            console.log(str);
            res.send(str);
        });
    };

    http.request(options, callback).end();
});

/* Test Tomcat Server */
router.get('/tomcat/test', function(req, res, next) {

    var options = {
        host: 'localhost',
        port: 8080,
        path: '/',
        method: 'GET'
    };

    callback = function(response) {
        var str = '';

        //another chunk of data has been recieved, so append it to `str`
        response.on('data', function (chunk) {
            str += chunk;
        });

        //the whole response has been recieved, so we just print it out here
        response.on('end', function () {
		console.log(str);
            	res.send(str);
        });
    };

    http.request(options, callback).end();
});

/* GET Merged SocialMedia n Government Profiles*/
router.get('/search', function(req, res, next) {
    async.parallel({
        government: function(callback) {
                var options = {
                    host: 'localhost',
                    port: 8080,
                    path: '/FYPAsid/rest/UserService/user?name=' + req.query.name,
                    method: 'GET'
                };

                govCallback = function(response) {
                    var govProfiles = '';

                    //another chunk of data has been recieved, so append it to `str`
                    response.on('data', function (profile) {
                        govProfiles += profile;
                    });

                    //the whole response has been recieved, so we just print it out here
                    response.on('end', function () {
                        //console.log(govProfiles);
                        callback(null, govProfiles );
                    });
                };

                http.request(options, govCallback).end();
        },
        socialMedia: function(callback) {
            var options = {
                host: 'localhost',
                port: 5000,
                path: '/match?name=' + req.query.name,
                method: 'GET'
            };

            socialCallback = function(response) {
                var socialProfiles = '';

                //another chunk of data has been recieved, so append it to `str`
                response.on('data', function (profile) {
                    socialProfiles += profile;
                });

                //the whole response has been recieved, so we just print it out here
                response.on('end', function () {
                    //console.log(socialProfiles);
                    callback(null, socialProfiles );
                });
            };

            http.request(options, socialCallback).end();
        }
    }, function(err, results) {
        if (err)
            res.send(err);

        // Build the post string from an object
        var data = querystring.stringify(results);

        // An object of options to indicate where to post to
        var options = {
            hostname: 'localhost',
            port: 4000,
            path: '/test/socialmedia/data',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        faceRecognitionCallback = function(response) {
            var mergedProfiles = '';

            //another chunk of data has been recieved, so append it to `str`
            response.on('data', function (profile) {
                mergedProfiles += profile;
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
                //console.log(socialProfiles);
                res.send(mergedProfiles);
            });
        };

        // Set up the request
        var request = http.request(options, faceRecognitionCallback);

        // post the data
        request.write(data);
        request.end();
    });
});


module.exports = router;
