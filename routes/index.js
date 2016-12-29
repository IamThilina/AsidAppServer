var express = require('express');
var http = require('http');
var router = express.Router();

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
        path: '/FYPAsid/rest/UserService/user?name' + req.query.name,
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

module.exports = router;
