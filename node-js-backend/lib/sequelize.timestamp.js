'use strict';

const BaseTypes = require('sequelize/lib/data-types');
const util = require('util');

// Defines custom TIMESTAMP data type for MySQL
const TIMESTAMP = function () {
    if (!(this instanceof TIMESTAMP)) {
        return new TIMESTAMP();
    }

    BaseTypes.ABSTRACT.apply(this, arguments);
};

util.inherits(TIMESTAMP, BaseTypes.ABSTRACT);

TIMESTAMP.prototype.key = TIMESTAMP.key = 'TIMESTAMP';

module.exports.TIMESTAMP = TIMESTAMP;