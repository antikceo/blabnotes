/*
var http = require('http');

http.createServer(
    function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');
    }
).listen(process.env.PORT);
*/

var connect = require('connect');

connect.createServer(
    connect.static("/var/lib/stickshift/5284146d5973ca06350000b3/app-root/data/679302")
).listen(process.env.PORT);
