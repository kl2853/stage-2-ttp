const router = require("express").Router();
const { User } = require("../db/models");

module.exports = router;

// necessary for user balance to update in real time due to combined redux state
router.put("/:userId/buy", async(req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId);
        await user.update({ accountBalance: user.accountBalance - req.body.totalPrice });
        res.json(user);
    } catch (err) {
        next(err);
    }
})
