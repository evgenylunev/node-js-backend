const {Call} = require('../models/');
const {to, ReE, ReS} = require('../services/util');
const {Sequelize, Op} = require("sequelize");

/**
 * Calculates limit and offset for database query based on pagination parameters
 */
const getPagination = function (page, size) {
    let limit = size ? +size : 3;
    let offset = page ? page * limit : 0;

    return {limit, offset};
};

/**
 * Converts data (result set) from query to "pages"
 * indicating total items, total number of pages, current page
 */
const getPagingData = function (data, page, limit) {
    let {count: totalItems, rows: calls} = data;
    let currentPage = page ? +page : 0;
    let totalPages = Math.ceil(totalItems / limit);

    return {totalItems, calls, totalPages, currentPage};
};

/**
 * Creates call
 */
module.exports.create = async function (req, res) {
    let [err, call] = await to(Call.create(req.body));
    if (err) {
        return ReE(res, err, 422);
    }

    [err, call] = await to(call.save());
    if (err) {
        return ReE(res, err, 422);
    }

    return ReS(res, {call: call.toWeb()}, 201);
};

/* Finds all calls - as this function returns  single call by unique id - no need for pagination */
module.exports.getCall = async function (req, res) {
    let callId = req.query.id;

    let [err, call] = await to(Call.findOne({where: {id: callId}}));
    if (err) {
        return ReE(res, "err finding call");
    }

    if (!call) {
        return ReE(res, "Call with id not found: " + callId);
    }

    return ReS(res, {call: call.toWeb()}, 200);
};

/**
 * Finds all calls by user id
 */
module.exports.getByUserId = async function (req, res) {
    let userId = req.query.user_id;

    let {limit, offset} = getPagination(req.query.page, req.query.size);

    let [err, calls] = await to(Call.findAndCountAll({
        where: {user_id: userId},
        limit: limit,
        offset: offset
    }));
    if (err) {
        return ReE(res, "err finding call");
    }

    let response = getPagingData(calls, req.query.page, limit);
    return ReS(res, {response});
};

/**
 * Fins all calls made from certain phone number
 */
module.exports.getByFromNumber = async function (req, res) {
    let fromNumber = req.query.from;

    let {limit, offset} = getPagination(req.query.page, req.query.size);

    let [err, calls] = await to(Call.findAndCountAll({
        where: {from_phone_num: fromNumber},
        limit: limit,
        offset: offset
    }));
    if (err) {
        return ReE(res, "err finding call");
    }

    let response = getPagingData(calls, req.query.page, limit);
    return ReS(res, {response});
};

/**
 * Finds all calls contained in the database
 */
module.exports.getAll = async function (req, res) {
    let {limit, offset} = getPagination(req.query.page, req.query.size);

    let [err, calls] = await to(Call.findAndCountAll({limit: limit, offset: offset}));
    if (err) {
        return ReE(res, "err finding all call");
    }

    let response = getPagingData(calls, req.query.page, limit);
    return ReS(res, {response});
};

/**
 * Finds all calls made between specified dates
 */
module.exports.betweenDates = async function (req, res) {
    let {limit, offset} = getPagination(req.query.page, req.query.size);

    let [err, calls] = await to(Call.findAndCountAll({
        where: {
            time_when_occured: {[Op.between]: [req.query.start, req.query.end]}
        }, limit: limit, offset: offset
    }));
    if (err) {
        return ReE(res,
            "err finding calls between dates" + req.body.start + " and " + req.body.end);
    }

    let response = getPagingData(calls, req.query.page, limit);
    return ReS(res, {response});
};

/**
 * Updates a call record (specified by id) in the database to indicate that this was robocall
 */
module.exports.setRobocall = async function (req, res) {
    let [err, call] = await to(Call.update(
        {is_robocall: 1},
        {where: {id: req.body.id}}
    ));
    if (err) {
        return ReE(res, err);
    }

    return ReS(res, {result: 'Updated call with id: ' + req.body.id}, 200);
};

/**
 * Deletes call specified by id from database
 */
module.exports.remove = async function (req, res) {
    let [err, call] = await to(Call.destroy({
        where: {id: req.body.id}
    }));
    if (err) {
        return ReE(res, 'error occured trying to delete the call');
    }

    return ReS(res, {result: 'Deleted Call'}, 204);
};