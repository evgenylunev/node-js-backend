const {to} = require('await-to-js');
const pe = require('parse-error');

/**
 * Handles promises  and errors
 */
module.exports.to = async function (promise) {
    let [err, res] = await to(promise);
    if (err) {
        return [pe(err)];
    }

    return [null, res];
};

/** Error Web Response */
module.exports.ReE = function (res, err, code) {
    if (typeof err == 'object' && typeof err.message != 'undefined') {
        err = err.message;
    }

    if (typeof code !== 'undefined') {
        res.statusCode = code;
    }

    return res.json({success: false, error: err});
};

/** Success Web Response */
module.exports.ReS = function (res, data, code) {
    let sendData = {success: true};

    if (typeof data == 'object') {
        sendData = Object.assign(data, sendData);// merge the objects
    }

    if (typeof code !== 'undefined') {
        res.statusCode = code;
    }

    return res.json(sendData)
};

/** Throw Error */
module.exports.TE = function (errMessage, log) {
    if (log === true) {
        console.error(errMessage);
    }

    throw new Error(errMessage);
};
