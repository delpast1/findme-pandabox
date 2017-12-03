'use strict';

var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    passport = require('passport'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session');

var configDB = require('./app/config/db.js');
//configure
mongoose.connect(configDB.url, {useMongoClient: true}); // connect db
require('./app/config/passport')(passport);

// set up express app
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (need for auth)
app.use(bodyParser.json()); // get information from html form
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

//require for passport
app.use(session({
  secret: 'findme',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//routes
require('./routes/index')(app, passport);

//launch
app.listen(port);
console.log('Port '+ port + ' in use.');