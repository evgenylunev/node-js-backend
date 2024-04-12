'use strict';
const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const jwt = require('jsonwebtoken');
const {TE, to} = require('../services/util');
const CONFIG = require('../config/config');

// Defines User model
module.exports = function (sequelize, DataTypes) {
    var Model = sequelize.define('User', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        timestamps: false
    });

    // Hashes password every time it changes
    Model.beforeSave(async (user, options) => {
        if (user.changed('password')) {
            let err, salt, hash;
            [err, salt] = await to(bcrypt.genSalt(10));
            if (err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if (err) TE(err.message, true);

            user.password = hash;
        }
    });

    Model.prototype.comparePassword = async function (pw) {
        let err, pass
        if (!this.password) {
            TE('password not set');
        }

        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if (err) {
            TE(err);
        }

        if (!pass) {
            TE('invalid password');
        }

        return this;
    }

    // Provide JSON Web Token
    Model.prototype.getJWT = function () {
        let expiration_time = parseInt(CONFIG.jwt_expiration);
        return "Bearer " +
            jwt.sign({user_id: this.id}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
    };

    // Converts to JSON representation
    Model.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return Model;
};