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

router.post('/find', function(req, res, next) {
    /*const aggregatedResults = {
        "Aggregated Education":["University of Moratuwa - Faculty of Engineering","Royal College - Colombo 07 (Colombo)"],
        "Aggregated Work":["Siplo","VEGA"],
        "profiles":[
            {
                "government":
                {
                    "NIC data":
                    {
                        "FamilyName":"",
                        "postal code":"70100",
                        "place of birth":"Rathnapura","telephone":"+94774592258",
                        "picture":"http://localhost:3000/images/asela.jpg",
                        "village or city":"Balangoda",
                        "Civil Status":"Single",
                        "Name":"Asela Darshan Buddhika",
                        "Profession":"Undergraduate",
                        "E-mail":"asela.12@cse.mrt.ac.lk",
                        "ID":"923651824V",
                        "Number of the house":"1F",
                        "Date of birth":"12/30/1992 12:00:00 AM",
                        "District":"Rathnapura",
                        "Surname":"Priyadarshana",
                        "secretariat division":"Balangoda"
                    }
                },
                "socialMedia":
                    {
                        "facebook":
                            {
                                "places":[{"city":"Katubedda, Sri Lanka","status":"Current city"}],
                                "education":[{"school":"University of Moratuwa - Faculty of Engineering","details":"Class of 2017 · BSc Engineering Honours · Integrated Computer Engineering · Moratuwa, Sri Lanka"},{"school":"University of Moratuwa - Faculty of Engineering","details":"Moratuwa, Sri Lanka"},{"school":"Royal College (Colombo)","details":"Physical science · Colombo, Sri Lanka"}],
                                "gender":"Male",
                                "social links":"https://lk.linkedin.com/in/aselapriyadarshana(LinkedIn)",
                                "work":[{"work":"Siplo","details":"Co-founder · 2015 to present · Moratuwa, Sri Lanka"},{"work":"VEGA","details":"Engineering Intern · 19 October 2015 to 2 April 2016 · Maradana"}],
                                "facebook":"http://facebook.com/asela.darshan",
                                "name":"Asela Priyadarshana",
                                "profile_picture":"https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-1/c164.104.323.323/s160x160/1558597_719877614747952_5267274024535570642_n.jpg?oh=47fd5335a79afbf51f5b6f41a9a45a2b&oe=58EBE85B",
                                "_id":{"$oid":"57a5be4afe6fb226a8cb1424"},
                                "friends":[]
                            },
                        "linkedIn":
                            {
                                "skills":["Java","C++","C","Software Engineering","Programming","Computer Hardware","MySQL","Electronics","Object Oriented Software","Embedded Systems","Microcontrollers","Teamwork","Algorithms","C#","HTML","Matlab","Object Oriented Design","Data Structures","Microsoft Office","Visual C++","PHP","NodeJs","Symfony","Raspberry Pi","JavaScript","Amazon Web Services (AWS)","PCB Design","Arduino","Atmel AVR","ASP.NET",".NET","Cross-platform Mobile app development"],
                                "education":[{"school":"University of Moratuwa","course":"Bachelor of Science (BSc), Computer Engineering"},{"school":"Royal College - Colombo 07","course":", Mathematics"}],
                                "projects":[{"project":"Rhino Mark III Robot Arm Recreation"},{"project":"Object Oriented Software Development"},{"project":"Smart Personal Digital Assistant"},{"project":"SkyLyzer"},{"project":"Smart Personal Digital Assistant"}],
                                "languages":["English","Sinhalese"],
                                "name":"Asela Priyadarshana",
                                "matched":true,
                                "_id":{"$oid":"57a5eb11fe6fb203d4cbb130"},
                                "linkedin":"https://www.linkedin.com/in/aselapriyadarshana"}
                    }
            }],
        "Aggregated Names":["Asela Darshan Buddhika Priyadarshana"]
    };*/
    const aggregatedResults = {
        "final":
            [
                {
                    'everything': {
                        "socialMedia":
                            {
                                "linkedIn":
                                    {
                                        "skills":
                                            [
                                                "Java","C++","C","Software Engineering","Programming","Computer Hardware","MySQL","Electronics","Object Oriented Software","Embedded Systems","Microcontrollers","Teamwork","Algorithms","C#","HTML","Matlab","Object Oriented Design","Data Structures","Microsoft Office","Visual C++","PHP","NodeJs","Symfony","Raspberry Pi","JavaScript","Amazon Web Services (AWS)","PCB Design","Arduino","Atmel AVR","ASP.NET",".NET","Cross-platform Mobile app development"
                                            ],
                                        "projects":
                                            [
                                                {"project":"Rhino Mark III Robot Arm Recreation"},
                                                {"project":"Object Oriented Software Development"},
                                                {"project":"Smart Personal Digital Assistant"},
                                                {"project":"SkyLyzer"},
                                                {"project":"Smart Personal Digital Assistant"}
                                            ],
                                        "languages":
                                            [
                                                "English",
                                                "Sinhalese"
                                            ],
                                        "matched":true,
                                        "_id":{"$oid":"57a5eb11fe6fb203d4cbb130"},
                                        "linkedin":"https://www.linkedin.com/in/aselapriyadarshana",
                                        "name":"Asela Priyadarshana",
                                        "education":
                                            [
                                                {"course":"Bachelor of Science (BSc), Computer Engineering","school":"University of Moratuwa"},
                                                {"course":", Mathematics","school":"Royal College - Colombo 07"}
                                            ]
                                    },
                                "facebook":
                                    {
                                        "work":
                                            [
                                                {"work":"Siplo","details":"Co-founder · 2015 to present · Moratuwa, Sri Lanka"},
                                                {"work":"VEGA","details":"Engineering Intern · 19 October 2015 to 2 April 2016 · Maradana"}
                                            ],
                                        "social links":"https://lk.linkedin.com/in/aselapriyadarshana(LinkedIn)",
                                        "profile_picture":"https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-1/c164.104.323.323/s160x160/1558597_719877614747952_5267274024535570642_n.jpg?oh=47fd5335a79afbf51f5b6f41a9a45a2b&oe=58EBE85B",
                                        "friends":[],
                                        "_id":{"$oid":"57a5be4afe6fb226a8cb1424"},
                                        "name":"Asela Priyadarshana",
                                        "facebook":"http://facebook.com/asela.darshan",
                                        "gender":"Male",
                                        "places":[{"status":"Current city","city":"Katubedda, Sri Lanka"}],
                                        "education":[
                                            {"school":"University of Moratuwa - Faculty of Engineering","details":"Class of 2017 · BSc Engineering Honours · Integrated Computer Engineering · Moratuwa, Sri Lanka"},
                                            {"school":"University of Moratuwa - Faculty of Engineering","details":"Moratuwa, Sri Lanka"},
                                            {"school":"Royal College (Colombo)","details":"Physical science · Colombo, Sri Lanka"}
                                        ]
                                    }
                            },
                        "Aggregated Work":
                            [
                                {"Details":"Co-founder · 2015 to present · Moratuwa, Sri Lanka","Company":"Siplo"},
                                {"Details":"Engineering Intern · 19 October 2015 to 2 April 2016 · Maradana","Company":"VEGA"}
                            ],
                        "government":
                            {
                                "Vehicle data":{},
                                "NIC data":
                                    {
                                        "Number of the house":"1F",
                                        "Profession":"Undergraduate",
                                        "E-mail":"asela.12@cse.mrt.ac.lk",
                                        "Civil Status":"Single",
                                        "Name":"Asela Darshan Buddhika",
                                        "picture":"http://localhost:3000/images/asela.jpg",
                                        "village or city":"Balangoda",
                                        "Date of birth":"12/30/1992 12:00:00 AM",
                                        "District":"Rathnapura",
                                        "place of birth":"Rathnapura",
                                        "ID":"923651824V",
                                        "secretariat division":"Balangoda",
                                        "FamilyName":"",
                                        "Surname":"Priyadarshana",
                                        "telephone":"+94774592258",
                                        "postal code":"70100"
                                    },
                                "Driving License data":{}
                            },
                        "Aggregated Education":
                            [
                                {"Details":"class of 2017 ,  bsc engineering honours ,  integrated computer engineering ,  moratuwa,  sri lanka, bachelor of science (bsc), ","Institute":"University of Moratuwa - Faculty of Engineering"},
                                {"Details":"physical science ,  colombo,  sri lanka,  mathematics, ","Institute":"Royal College - Colombo 07 (Colombo)"}
                            ],
                        "Aggregated Names":["Asela Darshan Buddhika Priyadarshana"]
                    }

                },
                {
                    'everything': {
                        "socialMedia":
                            {
                                "linkedIn":
                                    {
                                        "skills":
                                            [
                                                "Java","C++","C","Software Engineering","Programming","Computer Hardware","MySQL","Electronics","Object Oriented Software","Embedded Systems","Microcontrollers","Teamwork","Algorithms","C#","HTML","Matlab","Object Oriented Design","Data Structures","Microsoft Office","Visual C++","PHP","NodeJs","Symfony","Raspberry Pi","JavaScript","Amazon Web Services (AWS)","PCB Design","Arduino","Atmel AVR","ASP.NET",".NET","Cross-platform Mobile app development"
                                            ],
                                        "projects":
                                            [
                                                {"project":"Rhino Mark III Robot Arm Recreation"},
                                                {"project":"Object Oriented Software Development"},
                                                {"project":"Smart Personal Digital Assistant"},
                                                {"project":"SkyLyzer"},
                                                {"project":"Smart Personal Digital Assistant"}
                                            ],
                                        "languages":
                                            [
                                                "English",
                                                "Sinhalese"
                                            ],
                                        "matched":true,
                                        "_id":{"$oid":"57a5eb11fe6fb203d4cbb130"},
                                        "linkedin":"https://www.linkedin.com/in/aselapriyadarshana",
                                        "name":"Asela Priyadarshana",
                                        "education":
                                            [
                                                {"course":"Bachelor of Science (BSc), Computer Engineering","school":"University of Moratuwa"},
                                                {"course":", Mathematics","school":"Royal College - Colombo 07"}
                                            ]
                                    },
                                "facebook":
                                    {
                                        "work":
                                            [
                                                {"work":"Siplo","details":"Co-founder · 2015 to present · Moratuwa, Sri Lanka"},
                                                {"work":"VEGA","details":"Engineering Intern · 19 October 2015 to 2 April 2016 · Maradana"}
                                            ],
                                        "social links":"https://lk.linkedin.com/in/aselapriyadarshana(LinkedIn)",
                                        "profile_picture":"https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-1/c164.104.323.323/s160x160/1558597_719877614747952_5267274024535570642_n.jpg?oh=47fd5335a79afbf51f5b6f41a9a45a2b&oe=58EBE85B",
                                        "friends":[],
                                        "_id":{"$oid":"57a5be4afe6fb226a8cb1424"},
                                        "name":"Asela Priyadarshana",
                                        "facebook":"http://facebook.com/asela.darshan",
                                        "gender":"Male",
                                        "places":[{"status":"Current city","city":"Katubedda, Sri Lanka"}],
                                        "education":[
                                            {"school":"University of Moratuwa - Faculty of Engineering","details":"Class of 2017 · BSc Engineering Honours · Integrated Computer Engineering · Moratuwa, Sri Lanka"},
                                            {"school":"University of Moratuwa - Faculty of Engineering","details":"Moratuwa, Sri Lanka"},
                                            {"school":"Royal College (Colombo)","details":"Physical science · Colombo, Sri Lanka"}
                                        ]
                                    }
                            },
                        "Aggregated Work":
                            [
                                {"Details":"Co-founder · 2015 to present · Moratuwa, Sri Lanka","Company":"Siplo"},
                                {"Details":"Engineering Intern · 19 October 2015 to 2 April 2016 · Maradana","Company":"VEGA"}
                            ],
                        "government":
                            {
                                "Vehicle data":{},
                                "NIC data":
                                    {
                                        "Number of the house":"1F",
                                        "Profession":"Undergraduate",
                                        "E-mail":"asela.12@cse.mrt.ac.lk",
                                        "Civil Status":"Single",
                                        "Name":"Asela Darshan Buddhika",
                                        "picture":"http://localhost:3000/images/asela.jpg",
                                        "village or city":"Balangoda",
                                        "Date of birth":"12/30/1992 12:00:00 AM",
                                        "District":"Rathnapura",
                                        "place of birth":"Rathnapura",
                                        "ID":"923651824V",
                                        "secretariat division":"Balangoda",
                                        "FamilyName":"",
                                        "Surname":"Priyadarshana",
                                        "telephone":"+94774592258",
                                        "postal code":"70100"
                                    },
                                "Driving License data":{}
                            },
                        "Aggregated Education":
                            [
                                {"Details":"class of 2017 ,  bsc engineering honours ,  integrated computer engineering ,  moratuwa,  sri lanka, bachelor of science (bsc), ","Institute":"University of Moratuwa - Faculty of Engineering"},
                                {"Details":"physical science ,  colombo,  sri lanka,  mathematics, ","Institute":"Royal College - Colombo 07 (Colombo)"}
                            ],
                        "Aggregated Names":["Asela Darshan Buddhika Priyadarshana"]
                    }

                },
                {
                    'everything': {
                        "socialMedia":
                            {
                                "linkedIn":
                                    {
                                        "skills":
                                            [
                                                "Java","C++","C","Software Engineering","Programming","Computer Hardware","MySQL","Electronics","Object Oriented Software","Embedded Systems","Microcontrollers","Teamwork","Algorithms","C#","HTML","Matlab","Object Oriented Design","Data Structures","Microsoft Office","Visual C++","PHP","NodeJs","Symfony","Raspberry Pi","JavaScript","Amazon Web Services (AWS)","PCB Design","Arduino","Atmel AVR","ASP.NET",".NET","Cross-platform Mobile app development"
                                            ],
                                        "projects":
                                            [
                                                {"project":"Rhino Mark III Robot Arm Recreation"},
                                                {"project":"Object Oriented Software Development"},
                                                {"project":"Smart Personal Digital Assistant"},
                                                {"project":"SkyLyzer"},
                                                {"project":"Smart Personal Digital Assistant"}
                                            ],
                                        "languages":
                                            [
                                                "English",
                                                "Sinhalese"
                                            ],
                                        "matched":true,
                                        "_id":{"$oid":"57a5eb11fe6fb203d4cbb130"},
                                        "linkedin":"https://www.linkedin.com/in/aselapriyadarshana",
                                        "name":"Asela Priyadarshana",
                                        "education":
                                            [
                                                {"course":"Bachelor of Science (BSc), Computer Engineering","school":"University of Moratuwa"},
                                                {"course":", Mathematics","school":"Royal College - Colombo 07"}
                                            ]
                                    },
                                "facebook":
                                    {
                                        "work":
                                            [
                                                {"work":"Siplo","details":"Co-founder · 2015 to present · Moratuwa, Sri Lanka"},
                                                {"work":"VEGA","details":"Engineering Intern · 19 October 2015 to 2 April 2016 · Maradana"}
                                            ],
                                        "social links":"https://lk.linkedin.com/in/aselapriyadarshana(LinkedIn)",
                                        "profile_picture":"https://scontent-sin6-1.xx.fbcdn.net/v/t1.0-1/c164.104.323.323/s160x160/1558597_719877614747952_5267274024535570642_n.jpg?oh=47fd5335a79afbf51f5b6f41a9a45a2b&oe=58EBE85B",
                                        "friends":[],
                                        "_id":{"$oid":"57a5be4afe6fb226a8cb1424"},
                                        "name":"Asela Priyadarshana",
                                        "facebook":"http://facebook.com/asela.darshan",
                                        "gender":"Male",
                                        "places":[{"status":"Current city","city":"Katubedda, Sri Lanka"}],
                                        "education":[
                                            {"school":"University of Moratuwa - Faculty of Engineering","details":"Class of 2017 · BSc Engineering Honours · Integrated Computer Engineering · Moratuwa, Sri Lanka"},
                                            {"school":"University of Moratuwa - Faculty of Engineering","details":"Moratuwa, Sri Lanka"},
                                            {"school":"Royal College (Colombo)","details":"Physical science · Colombo, Sri Lanka"}
                                        ]
                                    }
                            },
                        "Aggregated Work":
                            [
                                {"Details":"Co-founder · 2015 to present · Moratuwa, Sri Lanka","Company":"Siplo"},
                                {"Details":"Engineering Intern · 19 October 2015 to 2 April 2016 · Maradana","Company":"VEGA"}
                            ],
                        "government":
                            {
                                "Vehicle data":{},
                                "NIC data":
                                    {
                                        "Number of the house":"1F",
                                        "Profession":"Undergraduate",
                                        "E-mail":"asela.12@cse.mrt.ac.lk",
                                        "Civil Status":"Single",
                                        "Name":"Asela Darshan Buddhika",
                                        "picture":"http://localhost:3000/images/asela.jpg",
                                        "village or city":"Balangoda",
                                        "Date of birth":"12/30/1992 12:00:00 AM",
                                        "District":"Rathnapura",
                                        "place of birth":"Rathnapura",
                                        "ID":"923651824V",
                                        "secretariat division":"Balangoda",
                                        "FamilyName":"",
                                        "Surname":"Priyadarshana",
                                        "telephone":"+94774592258",
                                        "postal code":"70100"
                                    },
                                "Driving License data":{}
                            },
                        "Aggregated Education":
                            [
                                {"Details":"class of 2017 ,  bsc engineering honours ,  integrated computer engineering ,  moratuwa,  sri lanka, bachelor of science (bsc), ","Institute":"University of Moratuwa - Faculty of Engineering"},
                                {"Details":"physical science ,  colombo,  sri lanka,  mathematics, ","Institute":"Royal College - Colombo 07 (Colombo)"}
                            ],
                        "Aggregated Names":["Asela Darshan Buddhika Priyadarshana"]
                    }

                }
            ]
    };
    const user = req.body.user;
    console.log(user.name);
    res.json(aggregatedResults);
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
            } else if(decoded.role == 'PUBLIC'){
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
            if (err) {
                return res.status(403).json({
                success: false,
                message: 'failed to authenticate'
                });
            } else if(decoded.role == 'PUBLIC'){
                req.decoded = decoded;
                next();
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
		console.log("Calling Aggregation API");
                request({  // calling aggregation system
            		method: 'POST',
                    url: "http://localhost:8080/FYPAsid/rest/UserService/aggregation",
                    body: mergedProfiles.body,
                    json: true,
                    headers: {
                      'Content-Type': 'application/json',
                    }

   	             }, (error, aggregatedProfiles, body) => {
                  if (error){
                    console.log("ERROR ATAGGREGATION");
                    console.log(error);
                  } else{
		      console.log("Calling Suggestion API");
                      const params = {};
                      params.school = req.body.user.school;
                      params.school = req.body.user.workPlace;
                      params.school = req.body.user.city;
                      params.profiles = aggregatedProfiles.body;

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
