const User = require("./user");
const Stock = require("./stock");
const Transaction = require("./transaction");

// associations
Stock.belongsToMany(User, { through: Transaction });

module.exports = {
    User,
    Stock,
    Transaction
}
