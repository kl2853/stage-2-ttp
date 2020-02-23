const router = require("express").Router();

module.exports = router;

router.use("/holdings", require("./holdings"));
router.use("/transactions", require("./transactions"));
router.use("/portfolio", require("./portfolios"));

router.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
})