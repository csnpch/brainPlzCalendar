const http = require('http');
const express = require('express');
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const env = require('./configs/env').server;
const PORT = env.port || 3000;
const cors = require('cors');
require('./configs/database');


//! Express get started
const app = express();
app.use(cors()); // core is a function
app.use(express.json());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(expressSession({
    secret: 'Jujunaa, because this a secret',
    resave: false,
    saveUninitialized: true,
    cookie: { }
}))


//! - allow static & content
app.use(express.static(`${__dirname}/www`));


//! - middleware
app.use(require('./middleware'));


//! - routers
app.get('/', (req, res) => { res.json({msg: 'Server is running'}); res.end(`<h1>Server is running!</h1>`); });
app.use('/api', require('./routers'));


module.exports = app;