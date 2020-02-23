const router = require("express").Router();
const Transaction = require("../db/models/transaction");

router.get("/:userId", async(req, res, next) => {
    try {
        const allTransactions = await Transaction.findAll({
            where: {
                id: req.params.userId
            }
        });
        res.json(allTransactions);
    } catch (err) {
        next(err);
    }
})

router.post("/:userId", async(req, res, next) => {
    try {
        const newTransaction = await Transaction.create(req.body, {
            where: {
                id: req.params.userId
            }
        });
        res.json(newTransaction);
    } catch (err) {
        next(err);
    }
})

module.exports = router;