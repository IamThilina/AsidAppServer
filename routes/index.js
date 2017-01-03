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


/* Test Tomcat Server */
router.get('/test', function(req, res, next) {

    /*var options = {
        host: 'localhost',
        port: 4000,
        path: '/post/test',
        method: 'POST',
	/*headers: {
                'Content-Type': 'application/json',
            
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

    var request = http.request(options, callback);

   // request.write('{"login":"toto","password":"okay","duration":"9999"}');
    request.write('{"name":"asanka"}');
	request.end(); */

request({
    method: 'POST',
    url: "http://localhost:4000/post/test",
    //body: '{"foo": "bar"}',
    json: true,
    body: {"foo": "bar"},
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
    }, function(err, results) {
        if (err)
            res.send(err);

        // Build the post string from an object
       // var data = JSON.stringify(results);

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
                console.log('##### data recieving ####');
		        console.log(profile);
		        console.log('##### data recieved ####');
                mergedProfiles += profile;
            });

            //the whole response has been recieved, so we just print it out here
            response.on('end', function () {
                //console.log(socialProfiles);
                res.send(mergedProfiles);
            });
	    response.on('error', function (err) {
                console.log('##### error recieving ####');
                console.log(err);
                console.log('##### error recieved ####');
                res.send(err);
            });


        };

        // Set up the request
        var request = http.request(options, faceRecognitionCallback);

        // post the data
        request.write('{"login":"toto","password":"okay","duration":"9999"}');
        request.end();
    });
});


module.exports = router;
