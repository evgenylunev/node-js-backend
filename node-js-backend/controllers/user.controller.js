const {User} = require('../models/');
const authService = require('../services/auth');
const {to, ReE, ReS} = require('../services/util');

/**
 * Creates and stores user
 */
module.exports.create = async function (req, res) {
    let body = req.body;

    if (!body.password) {
        return ReE(res, 'Please enter a password to register.');
    } else {
        let [err, user] = await to(authService.createUser(body));
        if (err) {
            return ReE(res, err, 422);
        }

        return ReS(res, {
            message: 'Successfully created new user.',
            user: user.toWeb(),
            token: user.getJWT()
        }, 201);
    }
};

/**
 * Extracts user from request
 */
module.exports.get = async function (req, res) {
    let user = req.user;

    return ReS(res, {user: user.toWeb()});
};

/**
 * Updates user password
 */
module.exports.update = async function (req, res) {
    let {user: user, body: data} = req;
    user.set({password: data.password});

    let err;
    [err, user] = await to(user.save());
    if (err) {
        return ReE(res, err);
    }

    return ReS(res, {message: 'Updated User: ' + user.id});
};

/**
 * Deletes user from database
 */
module.exports.remove = async function (req, res) {
    let user, err;
    user = req.user;

    [err, user] = await to(user.destroy());
    if (err) {
        return ReE(res, 'error occurred trying to delete user');
    }

    return ReS(res, {message: 'Deleted User'}, 204);
};

/**
 * Authenticates user
 */
module.exports.login = async function (req, res) {
    let [err, user] = await to(authService.authUser(req.body));
    if (err) {
        return ReE(res, err, 422);
    }

    return ReS(res, {token: user.getJWT(), user: user.toWeb()});
};