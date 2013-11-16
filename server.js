
var express = require('express'),
    app = express();

//app.use(express.logger());

app.use(express.static(__dirname));

app.listen(process.env.PORT);
console.log('Express server started on port %s', process.env.PORT);