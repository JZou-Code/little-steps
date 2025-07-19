const express = require("express");
const cors = require("cors");
const path = require('path')
const session = require('express-session');

const app = express();

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


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`CORS enabled Express web server is running on port ${PORT}.`);
});