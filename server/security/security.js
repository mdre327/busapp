const authMapping = require('./securityMapping.js');
const app = require('../app.js');
const logger = require('../logger.js');
const properties = require('../properties.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const handleError = require('./util.js').handleError;

/**
* This middleware executes security check for each request
*/
app.all(properties.api + '/*', function(req, res, next) {

    // Set default headers
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,user,pass,token");

    // Get roles authorized for called URL
    var roles = findRoleMapping(req.method + ' - ' + req.url.toLowerCase());

    // If is a public page
    if (!roles) {
        next();
    } else {
        // Verify JWT token
        let token = req.headers.authorization && req.headers.authorization.replace("Bearer ", "");

        if (!token) {
            logger.info("No Token Provided");
            res.status(401).send("No Token Provided");
        } else {
            jwt.verify(token, properties.tokenSecret, function(err, decodedUser) {
                if (err) {
                    // Token not valid
                    logger.info(token + " Token Not Valid");
                    logger.error(err);
                    res.status(401).send("Token Not Valid");
                } else {
                    // Get user
                    getUser(decodedUser.username, decodedUser.password, function(user) {
                        if (hasRole(roles, decodedUser)) {
                            req.user = decodedUser;
                            next();
                        } else {
                            logger.info(decodedUser, " not authorized for " + req.path);
                            res.status(401).send("Not authorized");
                        }
                    });
                }
            });
        }
    }
});

/**
 * Login API
 */
app.post(properties.api + '/login', function(req, res, md5pwd) {
    const db_Locations_db = require('../db/Locations_db_schema.js');
    // Get parameters from post request
    let params = req.body;
    // Verify user exists
    getUser(params.username, params.password, function(user) {
        if (user) {
            // Create token
            var token = jwt.sign(user, properties.tokenSecret, {
                expiresIn: 10800 //3 hours
            });
            user.token = token;
            user.password = undefined;
            res.send(user);
        } else {
            // Error login
            res.status(401);
            res.send({ message: "Not Authoized" });
        }
    });
});

/**
 * Verify JWT token API
 */
app.post(properties.api + '/verifyToken', function(req, res) {
    let token = req.body.token;
    if (token) {
        jwt.verify(token, properties.tokenSecret, function(err, decoded) {
            if (err) {
                return res.json({ success: false, mesage: 'Failed to authenticate token' });
            } else {
                res.json(decoded);
            }
        });
    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        });
    }

});

/**
 * Change password for current user
 */
app.post(properties.api + '/changePassword', function(req, res) {

    db_Locations_db.User.findOne({ username: req.user.username, password: req.body.passwordOld }).exec(function(err, user) {
        if (err) return handleError(err, res);
        if (!user) return handleError("Old password not valid", res);

        user.password = req.body.passwordNew;
        user.save(function(err) {
            if (err) return handleError(err, res);
            res.send({success: true});
        });
    });

});

// ---------------- UTILS FUNCTIONS ---------------- //

//GET ARRAY OF ROLES FOR URL
function findRoleMapping(url) {
    url = url.toLowerCase();
    for (var i in authMapping.authMapping) {
        regexp = new RegExp(i.toLowerCase())
        if (regexp.test(url)) {
            return authMapping.authMapping[i];
        }
    }
}

/**
 * Check if user has role
 * @param {*} roles String or array of roles to check
 * @param {*} user Current logged user
 */
var hasRole = function(roles, user) {
    return (roles == undefined ||
        (user != undefined && roles.length == 0) ||
        (user != undefined && roles.indexOf('PUBLIC') != -1) ||
        (user != undefined && user.roles.indexOf('ADMIN') != -1) ||
        (user != undefined && findOne(roles, user.roles)));
}

/**
 * Find value in array
 * @param {*} array1 
 * @param {*} array2 
 */
var findOne = function(array1, array2) {
    for (var i in array1) {
        for (var j in array2) {
            if (array1[i] == array2[j])
                return true
        }
    }

    return false;
}

/**
 * Get user from database
 * @param {*} username 
 * @param {*} password 
 * @param {*} callback 
 */
var getUser = function(username, password, callback) {

    // CUSTOMIZE THIS FUNCTION 
    // if you want to change login method

    db_Locations_db.User.findOne({ username: username, password: password }).lean().exec(function(err, user) {
        callback(user);
    });
};

/**
 * Create ADMIN user if is the first start
 */
var createUser = function() {

    db_Locations_db = require('../db/Locations_db_schema.js');
    db_Locations_db.User.count().exec(function(err, count) {
        if (count == 0) {
            var admin = new db_Locations_db.User({
                username: 'admin',
                password: '1a1dc91c907325c69271ddf0c944bc72',
                roles: ['ADMIN']
            });
            admin.save(function(err) {
                if (err) throw err;
            });
        };
    });
};
exports.createUser = createUser;