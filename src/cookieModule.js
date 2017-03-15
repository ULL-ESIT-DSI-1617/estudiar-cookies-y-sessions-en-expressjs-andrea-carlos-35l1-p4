var express = require('express');
var cookieParser = require('cookie-parser');
var util = require('util');
var cookie = require('cookie')
var app = express();
var cookiess = cookie.parse('nombre=valor; name=value')
var setCookie = cookie.serialize('nombres', 'valores');
var instrucciones = `
Visit these urls in the browser:
<ul>
  <li> localhost:3000/content</li>
  <li> visita localhost:8080/cookie</li>
  <li> visita localhost:8080/cookiess</li>
  <li> visita localhost:8080/setCookie</li>
  <li> visita localhost:8080/clearcookie</li>
</ul>
`;
app.use(cookieParser());

app.get('/cookie',function(req, res){
     res.cookie('cookie_name', 'cookie_value',
       {expire: new Date() + 9999}).send(
       "Escribe document.cookie en la consola del navegador para verlo");
});

app.get('/cookiess',function(req, res){
        console.log(cookiess)
     res.cookie(cookiess).send(

       "Escribe document.cookie en la consola del navegador para verlo");
});
app.get('/setCookie',function(req, res){
        console.log(setCookie)
     res.cookie(setCookie).send(

       "Escribe document.cookie en la consola del navegador para verlo");
});

app.get('/', function(req, res) {
  res.send(instrucciones);
});

app.get('/show', function(req, res) {
  console.log("Cookies :  "+util.inspect(req.cookies));
  res.send("Cookies :  "+util.inspect(req.cookies));
});

app.get('/clearcookie', function(req,res){
     res.clearCookie('cookie_name');
     res.clearCookie(cookiess);
     res.clearCookie(setCookie);
     res.send('Cookie deleted');
});

var server = app.listen(8088, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
