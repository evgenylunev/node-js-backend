const { to, ReE, ReS } = require('../services/util');

/**
 * Extracts user from request
 * @param req
 * @param res
 * @returns response with user representation
 */
module.exports.Dashboard = function(req, res){
    let user = req.user;
    return ReS(res, {call: user.toWeb()}, 200);
};