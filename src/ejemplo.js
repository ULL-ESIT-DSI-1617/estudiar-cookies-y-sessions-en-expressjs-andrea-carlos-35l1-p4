//Importamos los modulos express y express-session. Creamos una variable de express (app) y una de sesión (session).
var express = require('express'),
    app = express(),
    session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
var instrucciones = `
Visit these urls in the browser:
<ul>
  <li> visita /login para visitar el login (fallara)</li>
  <li> Para entrar en login correctamente utiliza: http://localhost:8088/login?username=amy&password=amypassword</li>
  <li> Usa /logout para salir.</li>
  <li> Solo podras acceder en /content si estas autentificado</li>
</ul>
`;
//Función Middleware de Autenticación y Autorización.
//Concede el siguiente paso si el usuario es amy y si tiene acceso de administrador.
var auth = function(req, res, next) {
  if (req.session && req.session.user === "amy" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};
app.get('/', function(req, res) {
  res.send(instrucciones);
});

//Login
//La sesión será diferente para cada usuario, y también será única para el mismo usuario utilizando diferentes navegadores.
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');
  } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
    req.session.user = "amy";
    req.session.admin = true;
    res.send("login success!");
  }
});

//Logout
//Destruye la sesión.
app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});

//Get
//Obtiene el contenido protegido. La función de autenticación anterior se pasa en el segundo parámetro como middleware antes de proceder a servir el contenido al usuario. Si la función auth determinó que el usuario no es válido, no pasará a la tercera función para servir el contenido.
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});

//Iniciamos la aplicación escuchando en el puerto 8088.
app.listen(8088);
console.log("app running at http://localhost:8088");
