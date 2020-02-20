const Sequelize = require("sequelize");
const db = require("../db");

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

module.exports = User;
