const router = require("express").Router();
const User = require("../db/models/user");

module.exports = router;

router.get("/:id", async(req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.json(user);
    } catch (err) {
        next(err);
    }
})

router.put("/:id/buy", async(req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        let prevBalance = user.accountBalance;
        await user.update({ accountBalance: prevBalance - req.body.totalPrice });
        res.json(user);
    } catch (err) {
        next(err);
    }
})
