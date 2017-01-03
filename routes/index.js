var express = require('express');
var http = require('http');
var request = require('request');
var router = express.Router();
var async = require('async');
var querystring = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/post/test', function(req, res, next) {
    console.log(req.body)
    console.log(req.body.name)
    res.send(200);
});


/* Test FaceRecognition Server */
router.get('/test', function(req, res, next) {

    request({
        method: 'POST',
        url: "http://localhost:4000/post/test",
        json: true,
        body: {foo: "bar"},
        headers: {
            'Content-Type': 'application/json',
        }

    }, (error, response, body) => {
        if (error)
            console.log(error);
        else{
          console.log(response);
          console.log(body);
        }
    }); //end of request

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
    }, function(err, results) {  // after matching social media and and government profiles
        if (err)
            res.send(err);

        request({  // calling face recognition system
            method: 'POST',
            url: "http://localhost:4000/facerecognizer/merge",
            json: true,
            body: results,
            headers: {
                'Content-Type': 'application/json',
            }

        }, (error, response, body) => {
            if (error)
                console.log(error);
            else{
                //console.log(response);
                //console.log(body);
		res.json(response.body);
            }
        }); //end of request
    });
});


module.exports = router;
