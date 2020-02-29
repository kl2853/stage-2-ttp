const User = require("./user")
const Transaction = require("./transaction")

// one to many association
User.hasMany(Transaction)
Transaction.belongsTo(User)

module.exports = {
    User,
    Transaction
}
