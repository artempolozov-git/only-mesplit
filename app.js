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

app.use((req, res, next) => {
    const origin = req.get('origin') || '*';
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");

    if ('OPTIONS' === req.method) {
        return res.sendStatus(200);
    }
    next();
})

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



module.exports = app;
