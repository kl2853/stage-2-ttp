const User = require("./user");
const Holding = require("./holding");
const Transaction = require("./transaction");
const Portfolio = require("./portfolio");

// one to many association
User.hasMany(Transaction);
Transaction.belongsTo(User);

// many to many symmetric association
// provides magic methods to both instances
Holding.belongsToMany(User, { through: Portfolio });
User.belongsToMany(Holding, { through: Portfolio });


module.exports = {
    User,
    Holding,
    Transaction,
    Portfolio
}
