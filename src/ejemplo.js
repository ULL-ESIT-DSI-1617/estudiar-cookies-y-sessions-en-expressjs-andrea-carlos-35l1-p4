var cookie = require('cookie')
var http = require('http');
var url = require('url')
//var cookieSession = require('cookie-session')
var cookieParser = require("cookie-parser")
var express = require('express')
var app = express()
var path = require('path');

//Set-Cookie: <cookie-name>=<cookie-value>;

document.cookie = nombrecookie=valorcookie; 

app.set('views', path.join(__dirname, 'views'));
app.set('views engine', 'ejs');

app.use(express.static('./'));

app.get('/hi', function (req, res) {
    res.send('Hello World')
})

var server = app.listen(8088, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
});
