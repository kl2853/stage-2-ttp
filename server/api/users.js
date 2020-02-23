const router = require("express").Router();
const User = require("../db/models/user");

module.exports = router;

router.get("/", async(req, res, next) => {
    try {
        const allUsers = User.findAll();
        res.json(allUsers);
    } catch (err) {
        next(err);
    }
})

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
        user.accountBalance -= req.body.totalPrice;
        await user.save();
        res.json(user);
    } catch (err) {
        next(err);
    }
})
