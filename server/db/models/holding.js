const Sequelize = require("sequelize");
const db = require("../db");

const Holding = db.define("holding", {
    ticker: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    companyName: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    }
})

module.exports = Holding;
