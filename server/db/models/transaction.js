const Sequelize = require("sequelize");
const db = require("../db");

const Transaction = db.define("transaction", {
    historicPrice: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    action: {
        type: Sequelize.ENUM("BUY", "SELL"),
        defaultValue: "BUY"
    }
})

module.exports = Transaction;
