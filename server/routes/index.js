																																																			var express = require('express');
var http = require('http');
var request = require('request');
var router = express.Router();
var async = require('async');
var querystring = require('querystring');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index.html');
});

router.post('/post/test', function(req, res, next) {
    console.log(req.body)
    console.log(req.body.name)
    res.send(200);
});


router.post('/find', function(req, res, next) {
    const aggregatedResults = {
        "Civil Status":"Single",
        "Date of birth":"12/30/1992 12:00:00 AM",
        "District":"Rathnapura",
        "E-mail":"asela.12@cse.mrt.ac.lk",
        "FamilyName":"",
        "ID":"923651824V",
        "Number of the house":"1F",
        "Profession":"Undergraduate",
        "Surname":"Priyadarshana",
        "picture":"http://139.59.37.202:3000/images/asela.jpg",
        "place of birth":"Rathnapura",
        "postal code":"70100",
        "secretariat division":"Balangoda",
        "telephone":"+94774592258",
        "village or city":"Balangoda",

        "education":[
            {"details":"Class of 2017 · BSc Engineering Honours · Integrated Computer Engineering · Moratuwa, Sri Lanka","school":"University of Moratuwa - Faculty of Engineering"},
            {"details":"Moratuwa, Sri Lanka","school":"University of Moratuwa - Faculty of Engineering"},
            {"details":"Physical science · Colombo, Sri Lanka","school":"Royal College (Colombo)"}
        ],
        "facebook":"http://facebook.com/asela.darshan",
        "friends":[],
        "gender":"Male",
        "places":[
            {"city":"Katubedda, Sri Lanka","status":"Current city"}
        ],
        "profile_picture":"https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-1/c164.104.323.323/s160x160/1558597_719877614747952_5267274024535570642_n.jpg?oh=47fd5335a79afbf51f5b6f41a9a45a2b&oe=58EBE85B",
        "social links":"https://lk.linkedin.com/in/aselapriyadarshana(LinkedIn)",
        "work":[
            {"details":"Co-founder · 2015 to present · Moratuwa, Sri Lanka","work":"Siplo"},
            {"details":"Engineering Intern · 19 October 2015 to 2 April 2016 · Maradana","work":"VEGA"}
        ],

        "languages":[
            "English",
            "Sinhalese"
        ],
        "linkedin":"https://www.linkedin.com/in/aselapriyadarshana",
        "name":"Asela Priyadarshana",
        "projects":[
            {"project":"Rhino Mark III Robot Arm Recreation"},
            {"project":"Object Oriented Software Development"},
            {"project":"Smart Personal Digital Assistant"},
            {"project":"SkyLyzer"},
            {"project":"Smart Personal Digital Assistant"}
        ],
        "skills":[
            "Java", "C++", "C",
            "Software Engineering", "Programming", "Computer Hardware",
            "MySQL", "Electronics", "Object Oriented Software",
            "Embedded Systems", "Microcontrollers", "Teamwork",
            "Algorithms", "C#", "HTML",
            "Matlab", "Object Oriented Design", "Data Structures",
            "Microsoft Office", "Visual C++", "PHP",
            "NodeJs", "Symfony","Raspberry Pi",
            "JavaScript","Amazon Web Services (AWS)","PCB Design",
            "Arduino","Atmel AVR","ASP.NET",
            ".NET","Cross-platform Mobile app development"
        ]
    };

    const user = req.body.user;
    console.log(user.name);
    res.json(aggregatedResults);
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
router.post('/search', function(req, res, next) {
    async.parallel({
        government: function(callback) {
                var options = {
                    host: 'localhost',
                    port: 8080,
                    path: '/FYPAsid/rest/UserService/user?town=colomb0&choice=g&name=' + req.body.user.name,
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
                path: '/match?name=' + req.body.user.name,
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

console.log("RESULTS FROM GOV n SOCIAL RECIEVED")
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
console.log("RESPONSE FROM FACERECOGNITION");
                //console.log(JSON.stringify(mergedProfiles.body));

                request({  // calling aggregation system
            method: 'POST',
            url: "http://localhost:8080/FYPAsid/rest/UserService/aggregation",
            body: mergedProfiles.body,
json: true,
            //body: JSON.stringify(mergedProfiles.body),
            //body: "#########################################################hello !!!!!!!!",          
  headers: {
                'Content-Type': 'application/json',
            }

        }, (error, profiles, body) => {
            if (error){
console.log("ERROR ATAGGREGATION")
                console.log(error);
}
            else{
                console.log("RESPONSE FROM AGGREGATION");
                console.log(profiles.body);
                        res.json(profiles.body);
            }
 // end of aggreation 
           });
        }
        }); //end of facerecognition
    });
});


module.exports = router;
