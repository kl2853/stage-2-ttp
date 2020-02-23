const router = require("express").Router();

module.exports = router;

router.use("/stocks", require("./stocks"));
router.use("/transactions", require("./transactions"));

router.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
})