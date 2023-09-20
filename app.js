require('dotenv').config();

const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const expressLayout = require('express-ejs-layouts');

const app = express();

const PORT = process.env.PORT || 8500

const secretKey = process.env.SECRET_KEY;

const oneDay = 1000 * 60 * 60 * 24;

const connectDB = require('./server/config/db');
// connect to Database
connectDB();

app.use(
    session({
        secret: secretKey,
        resave: false,
        saveUninitialized: true,
        cookie: { path: '/', httpOnly: true, secure: false, maxAge: oneDay },
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI
        })
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

// Set EJS as the view engine
app.use(expressLayout);
app.set('view engine', 'ejs');
app.set('layout', './layouts/main');
app.set('views', path.join(__dirname, './views'));

// Routes
app.use('/', require('./server/routes/index'));
app.use('/', require('./server/routes/dashboard'));
app.use('/', require('./server/routes/auth'));

app.use('*', function (req, res, next) {
    res.status(404).render('errors/404', { layout: false });
});

// Start the serverrs
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}`);
});