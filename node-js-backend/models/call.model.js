const {TE, to} = require('../services/util');
const customDataTypes = require('../lib/sequelize.timestamp');

//Defines Call model
module.exports = function (sequelize, DataTypes) {
    var Model = sequelize.define('Call', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: DataTypes.STRING,
        to_phone_num: DataTypes.STRING,
        from_phone_num: DataTypes.STRING,
        duration: DataTypes.INTEGER,
        time_when_occured: {
            type: customDataTypes.TIMESTAMP,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        is_robocall: DataTypes.BOOLEAN
    }, {
        timestamps: false
    });

    // Converts to JSON representation
    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};