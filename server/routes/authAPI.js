/**
 * Created by thilina on 2/10/17.
 */
var express = require('express');
var router = express.Router();
var AuthService = require('../services/authService');

router.post('/public', function(req, res, next) {
    AuthService.acceptPublicUser().then(response => {
        console.log('accepted public user');
        res.cookie('SEEK_THEM_COOKIE', response.token, { maxAge: 3600 * 24 * 1000});
        res.status(200).json({
            name: response.name
        });
    }, error => {
        res.status(406).json({
            success: false,
            message: "Internal Server Error"
        });
    });
});


router.post('/privileged', function(req, res, next) {
    AuthService.verifyUser(req.body.user).then(response => {
        res.cookie('SEEK_THEM_COOKIE', response.token, { maxAge: 3600 * 24 * 1000});
        res.status(200).json({
            name: response.name
        });
    }, error => {
        res.status(406).json({
            success: false,
            message: "Invalid Username or Password"
        });
    });
});


module.exports = router;
