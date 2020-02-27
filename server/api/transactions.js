const router = require("express").Router();
const { Transaction } = require("../db/models");

module.exports = router;

// get transaction history for given user
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

// get all unique stock holdings and quantities for given user
router.get("/:userId/owned", async(req, res, next) => {
    try {
        let eachShare = await Transaction.aggregate("ticker", "DISTINCT", {
            plain: false,
            where: {
                userId: req.params.userId
            }
        })

        let listOwned = [];
        for(let i in eachShare) {
            let share = eachShare[i]["DISTINCT"]
            const numShares = await Transaction.sum("quantity", {
                where: {
                    userId: req.params.userId,
                    ticker: share
                }
            })
            listOwned.push({ 
                ticker: share, 
                quantity: numShares 
            })
        }

        res.json(listOwned);
    } catch (err) {
        next(err);
    }
})

// new transaction for given user, account balance updated accordingly
router.post("/:userId/buy", async(req, res, next) => {
    try {
        const transaction = await Transaction.create({
            ticker: req.body.ticker,
            historicPrice: req.body.historicPrice,
            quantity: req.body.quantity,
            action: req.body.action
        });
        await transaction.update({ userId: req.params.userId });
        const numShares = await Transaction.sum("quantity", {
            where: {
                userId: req.params.userId,
                ticker: req.body.ticker
            }
        });
        res.json({ transaction, numShares });
    } catch (err) {
        next(err);
    }
})
