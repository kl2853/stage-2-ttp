const Sequelize = require("sequelize");
const db = require("../db");

const Portfolio = db.define("portfolio", {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

module.exports = Portfolio;