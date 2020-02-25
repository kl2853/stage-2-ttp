const router = require("express").Router();
const { Holding } = require("../db/models");

module.exports = router;

router.get("/:userId", async(req, res, next) => {
    try {
        const allHoldings = await Holding.findAll({
            where: {
                userId: req.params.userId
            },
            order: [
                ['id', 'DESC']
            ]
        });
        res.json(allHoldings);
    } catch (err) {
        next(err);
    }
})

router.put("/:userId/:ticker/buy", async(req, res, next) => {
    try {
        const [holding, created] = await Holding.findOrCreate({
            where: {
                ticker: req.params.ticker,
                userId: req.params.userId
            }
        });
        let prevQty = holding.quantity;
        await holding.update({ quantity: prevQty + Number(req.body.quantity) });
        res.json(holding);
    } catch (err) {
        next(err);
    }
})
