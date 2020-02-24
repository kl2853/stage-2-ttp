const Sequelize = require("sequelize");
const db = require("../db");

const Holding = db.define("holding", {
    ticker: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
    }
})

module.exports = Holding;
