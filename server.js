const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    fs = require('fs'),
    mustache = require('mustache-express');

app.use('/', express.static('./dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.engine('html', mustache());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/dist');

app.get('/drawing-pad/:width/:height', function (req, res)
{
    var height = req.params.height,
        width  = req.params.width;
    res.render("route.html", {height: height, width: width});
});

const server = app.listen('8000'),
      io = require('socket.io')(server);

module.exports = { io: io, app: app };
