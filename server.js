/*
var http = require('http');

http.createServer(
    function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');
    }
).listen(process.env.PORT);


var connect = require('connect');

connect.createServer(
    connect.static(__dirname)
).listen(process.env.PORT);



var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.listen(process.env.PORT);

*/

var express = require('express'),
    app = express();

//app.use(express.logger());

app.use(express.static(__dirname));

app.listen(process.env.PORT);
console.log('Express server started on port %s', process.env.PORT);