const router = require("express").Router();
const Portfolio = require("../db/models/portfolio");

module.exports = router;

router.get("/:userId", async(req, res, next) => {
    try {
        const wholePortfolio = Portfolio.findAll({
            where: {
                userId: req.params.userId
            }
        });
        res.json(wholePortfolio);
    } catch (err) {
        next(err);
    }
})

router.put("/:userId/:ticker/buy", async(req, res, next) => {
    try {
        const singleHolding = Portfolio.findOne({
            where: {
                userId: req.params.userId,
                holdingTicker: req.params.ticker
            }
        });
        singleHolding.quantity += req.body.quantity;
        await singleHolding.save();
        res.json(singleHolding);
    } catch (err) {
        next(err);
    }
})
