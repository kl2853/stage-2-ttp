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
        get() {
            return () => this.getDataValue("password")
        }
    },
    accountbalance: {
        type: Sequelize.INTEGER,
        defaultValue: 500000,
        allowNull: false
    }
})

// class methods
User.encryptPassword = async function(plainText) {
    try {
        let encrypted = await bcrypt.hash(plainText, saltRounds);
        return encrypted;
    } catch (err) {
        console.error(err);
    }
}

// instance methods
User.prototype.validPassword = async function(candidatePwd) {
    try {
        let validity = await bcrypt.compare(candidatePwd, this.password);
        return validity;
    } catch (err) {
        console.error(err);
    }
}

// hooks for encryption
const setPassword = async user => {
    if(user.changed("password")) {
        user.password = await User.encryptPassword(user.password);
    }
}

User.beforeCreate(setPassword);
User.beforeUpdate(setPassword);
User.beforeBulkCreate(users => {
    users.forEach(setPassword);
})

module.exports = User;
