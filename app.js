var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');

//mongoose.connect("mongodb://localhost:27017/capstonedb",

mongoose.connect("mongodb://mongo-db/capstonedb",
     { useNewUrlParser: true, useUnifiedTopology: true})
     .then(() => { console.log('Connected to Database!!!')})
     .catch((error) => { console.log(error) } )

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);

module.exports = app;
