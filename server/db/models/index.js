const User = require("./user");
const Holding = require("./holding");
const Transaction = require("./transaction");

// one to many association
User.hasMany(Transaction);
Transaction.belongsTo(User);

// one to one symmetric association
User.hasOne(Holding);
Holding.belongsTo(User);


module.exports = {
    User,
    Holding,
    Transaction
}
