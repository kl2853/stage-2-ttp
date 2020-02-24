const router = require("express").Router();

module.exports = router;

router.use("/transactions", require("./transactions"));
router.use("/holdings", require("./holdings"));
router.use("/users", require("./users"));

router.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
})