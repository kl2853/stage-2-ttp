const express = require("express");
const morgan = require("morgan");
const db = require("./db");
const compression = require("compression");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sessionStore = new SequelizeStore({ db });
const passport = require("passport");
const path = require("path");
const PORT = process.env.PORT || 1008;
const app = express();

module.exports = app;

// passport registration
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    try {
        const user = await db.models.user.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

const createApp = () => {
    // logging middleware
    app.use(morgan("dev"));

    // body parsing middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // compression middleware
    app.use(compression());

    // sessions middleware
    app.use(
        session({
            secret: process.env.SESSION_STORE || "w6unYWSDgcE4VXubn6ec",
            store: sessionStore,
            resave: false,
            saveUninitialized: false
        })
    )

    // authentication middleware
    app.use(passport.initialize());
    app.use(passport.session());

    // routes
    app.use("/auth", require("./auth"));

    // static file-serving middleware
    app.use(express.static(path.join(__dirname, "..", "public")));

    // error-handling middleware for file requests
    app.use((req, res, next) => {
        if(path.extname(req.path).length) {
            const err = new Error("File not found");
            err.status = 404;
            next(err);
        } else {
            next();
        }
    })

    // serves index.html
    app.use("*", (req, res) => {
        res.sendFile(path.join(__dirname, "..", "public/index.html"));
    })

    // development error handler
    app.use((err, req, res) => {
        console.error(err, err.stack);
        res.status(err.status || 500).send(err.message || "Internal server error");
    })
}

const startListening = () => {
    // start listening and create server object
    const server = app.listen(PORT, () =>
        console.log(`All systems go at ${PORT}`)
    );
}

const syncDb = () => db.sync();

async function startApp() {
    syncDb();
    createApp();
    startListening();
}

startApp();