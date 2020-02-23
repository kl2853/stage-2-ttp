const router = require("express").Router();
const Holding = require("../db/models/holding");

module.exports = router;

router.get("/", async(req, res, next) => {
    try {
        const allStocks = await Holding.findAll();
        res.json(allStocks);
    } catch (err) {
        next(err);
    }
})

router.post("/:ticker", async(req, res, next) => {
    try {
        const stock = await Holding.create(req.body);
        res.json(stock);
    } catch (err) {
        if(err.name === "SequelizeUniqueConstraintError") {
            res.status(401).send("Ticker already exists");
        } else {
            next(err);
        }
    }
})
