/**
 * Created by thilina on 12/16/16.
 */

var jwt = require('jsonwebtoken');
var Promise = require('promise');
var config = require('../config');
var mysqlConnectionPool = require('../mysqlConnectionPool');
var mysql = require('mysql');
var passwordHash = require('password-hash');

class AuthService {

    verifyUser(user){
        return new Promise((fulfill, reject) => {

            mysqlConnectionPool.getConnection(function (err, connection) {
                let sql = 'SELECT password,role,name FROM users  WHERE username = ' + connection.escape(user.username);
                connection.query(sql, function (err, results) {
                    if (err || results.length == 0)
                        reject();
                    else if (passwordHash.verify(user.password, results[0].password)){  // verify the password
                        const token = jwt.sign({role: results[0].role}, config.jwtSecret, {expiresIn: 3600 * 24});

                        const response = {
                            token: token,
                            name: results[0].name
                        };
                        fulfill(response);
                    } else reject()
                });
            });
        });
    }

    acceptPublicUser(){
        return new Promise((fulfill, reject) => {
            const token = jwt.sign({role: "PUBLIC"}, config.jwtSecret, {expiresIn: 3600 * 24});
            const response = {
                token: token,
                name: "Public User"
            };
            fulfill(response);
        });
    }

    addRole(user) {
        return new Promise((fulfill, reject) => {
            mysqlConnectionPool.getConnection(function (err, connection) {
                let sql = 'INSERT INTO users' +
                    '  ( username, password, role)' +
                    ' VALUES (?, ?)';
                let values = [user.username, passwordHash.generate(user.password), user.role];
                connection.query(sql, values, function (err, rows, fields) {
                    if (err)
                        reject(err);

                    fulfill();
                });
            });

        });
    }

}

module.exports = new AuthService();