const router = require("express").Router();
const { Transaction } = require("../db/models");

module.exports = router;

router.get("/:userId", async(req, res, next) => {
    try {
        const allTransactions = await Transaction.findAll({
            where: {
                userId: req.params.userId
            },
            order: [
                ['updatedAt', 'DESC']
            ]
        });
        res.json(allTransactions);
    } catch (err) {
        next(err);
    }
})

router.post("/:userId", async(req, res, next) => {
    try {
        const transaction = await Transaction.create(req.body);
        await transaction.update({ userId: req.params.userId });
        res.json(transaction);
    } catch (err) {
        next(err);
    }
})
