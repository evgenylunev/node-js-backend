const {User} = require('../models/');
const {to, TE} = require('../services/util');

/** GET login name. */
const getLoginName = function (body) {
    let loginName = body.name;
    if (typeof loginName === 'undefined') {
        loginName = null;
    }

    return loginName;
}

/**
 * Creates user if no user with specified name already exists
 * @param userInfo
 * @returns user
 */
module.exports.createUser = async function (userInfo) {
    let loginName, err, user;

    loginName = getLoginName(userInfo);
    [err, user] = await to(User.findOne({where: {name: loginName}}));
    if (user) {
        return TE("User already registered: " + loginName);
    }

    let authInfo = {};
    authInfo.status = 'create';

    if (!loginName) {
        TE('Login name was not entered.');
    }

    [err, user] = await to(User.create(userInfo));

    return user;
}

/**
 * Authenticates user
 * @param userInfo
 * @returns user
 */
module.exports.authUser = async function (userInfo) {
    let loginName;
    let authInfo = {};
    authInfo.status = 'login';
    loginName = getLoginName(userInfo);
    if (!loginName) {
        TE('Please enter an unique key to login');
    }

    if (!userInfo.password) {
        TE('Please enter a password to login');
    }

    let [err, user] = await to(User.findOne({where: {name: loginName}}));
    if (!user) {
        TE('Not registered');
    }

    [err, user] = await to(user.comparePassword(userInfo.password));
    if (err) {
        TE(err.message);
    }

    return user;
}