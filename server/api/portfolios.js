const router = require("express").Router();
const Portfolio = require("../db/models/portfolio");

module.exports = router;

router.get("/:userId", async(req, res, next) => {
    try {
        const wholePortfolio = await Portfolio.findAll({
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
        const holding = await Portfolio.findOrCreate({
            where: {
                userId: req.params.userId,
                holdingTicker: req.params.ticker
            }
        });
        let prevQty = holding.quantity;
        await holding.update({ quantity: prevQty + req.body.quantity });
        res.json(singleHolding);
    } catch (err) {
        next(err);
    }
})
