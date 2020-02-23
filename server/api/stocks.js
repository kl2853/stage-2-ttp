const router = require("express").Router();
const Stock = require("../db/models/stock");

router.get("/", async(req, res, next) => {
    try {
        const allStocks = await Stock.findAll();
        res.json(allStocks);
    } catch (err) {
        next(err);
    }
})

router.get("/:symbol", async(req, res, next) => {
    try {
        const stock = await Stock.findOne({
            where: {
                ticker: req.params.symbol
            }
        })
        res.json(stock);
    } catch (err) {
        next(err);
    }
})

router.post("/:symbol", async(req, res, next) => {
    try {
        const stock = await Stock.create(req.body);
        res.json(stock);
    } catch (err) {
        if(err.name === "SequelizeUniqueConstraintError") {
            res.status(401).send("Symbol already exists");
        } else {
            next(err);
        }
    }
})

module.exports = router;
