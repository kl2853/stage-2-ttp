const router = require("express").Router();
const User = require("../db/models/user");

module.exports = router;

router.post("/login", async(req, res, next) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if(!user) {
            console.log("No user found for email: ", req.body.email);
            res.status(401).send("This email is not associated with an account");
        } else if(!user.validPassword(req.body.password)) {
            console.log("Incorrect password for user: ", req.body.email);
            res.status(401).send("The email or password is incorrect");
        } else {
            req.login(user, err => (err 
                ? next(err) 
                : res.json(user)
            ));
        }
    } catch (err) {
        next(err);
    }
})

router.post("/signup", async(req, res, next) => {
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        req.login(user, err => (err
            ? next(err)
            : res.json(user)
        ));
    } catch (err) {
        if(err.name === "SequelizeUniqueConstraintError") {
            res.status(401).send("This email is already in use");
        } else {
            next(err);
        }
    }
})

router.post("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect("/");
})

router.get("/me", (req, res) => {
    res.json(req.user);
})