const router = require("express").Router();
const Holding = require("../db/models/holding");

module.exports = router;

router.get("/", async(req, res, next) => {
    try {
        const allHoldings = await Holding.findAll();
        res.json(allHoldings);
    } catch (err) {
        next(err);
    }
})

router.post("/:ticker", async(req, res, next) => {
    try {
        const [holding, created] = await Holding.findOrCreate({
            where: {
                ticker: req.params.ticker,
                companyName: req.body.companyName
            }
        });
        res.json(holding);
    } catch (err) {
        if(err.name === "SequelizeUniqueConstraintError") {
            res.status(401).send("Ticker already exists");
        } else {
            next(err);
        }
    }
})
