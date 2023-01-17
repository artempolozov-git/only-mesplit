var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const cors = require('cors');
/*const corsConfig = {
    origin: true,
    credentials: true,
    exposedHeaders: ['set-cookie']
};*/
var whitelist = ['https://only-mesplit.ru', 'http://localhost:8080/'];
/*var corsOptions = {
    origin: true,
    credentials: false,
    exposedHeaders: ['set-cookie']
};*/
/*var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}*/
const corsOptions = { credentials: true, origin: ["https://only-mesplit.ru/", /\.only-mesplit\.ru$/] };

var app = express();
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



module.exports = app;
