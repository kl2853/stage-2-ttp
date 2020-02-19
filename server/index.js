const express = require("express");
const morgan = require("morgan");
const path = require("path");
const PORT = process.env.PORT || 1008;
const app = express();

module.exports = app;

const createApp = () => {
    // logging middleware
    app.use(morgan("dev"));

    // body parsing middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // static file-serving middleware
    app.use(express.static(path.join(__dirname, "..", "public")));

    // send 404 for requests with extensions
    app.use((req, res, next) => {
        if(path.extname(req.path).length) {
            const err = new Error("Not found");
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

async function startApp() {
    createApp();
    startListening();
}

startApp();