const Sequelize = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = db.define("user", {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        get () {
            return () => this.getDataValue("password");
        }
    }
})

// class method
User.encryptPassword = function(plainText) {
    return bcrypt.hash(plainText, saltRounds);
}

// instance method
User.prototype.validPassword = function(candidatePwd) {
    return bcrypt.compare(candidatePwd, this.password());
}

// hooks for encryption
const setPassword = user => {
    if(user.changed("password")) {
        user.password = User.encryptPassword(user.password());
    }
}

User.beforeCreate(setPassword);
User.beforeUpdate(setPassword);
User.beforeBulkCreate(users => {
    users.forEach(setPassword);
})

module.exports = User;
