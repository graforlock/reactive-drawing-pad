const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    fs = require('fs');

app.use('/', express.static('./dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const server = app.listen('8000'),
      io = require('socket.io')(server);

module.exports = { io: io, app: app };
