/**
 * Main Express application server
 * Configures middleware, routes, and error handling for the backend API
 * Sets up session management, CORS, and static file serving
 */

const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const path = require('path')
const session = require('express-session');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, './public')));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "COMPX576",
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        secure: false,
        httpOnly: true
    }
}));

const topRouter = require('./src/routes/topRoutes')
app.use('/api', topRouter)

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500)
        .json({code: err.status || 500, message: err.message});
});

const PORT = process.env.EXPRESS_PORT || 3000;

app.listen(PORT, () => {
    console.log(`CORS enabled Express web server is running on port ${PORT}.`);
});
