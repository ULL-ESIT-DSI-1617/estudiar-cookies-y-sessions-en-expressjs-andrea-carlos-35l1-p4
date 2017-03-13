# Cookies y Sessions

##HTTP cookies
Un cookie HTTP es un pequeño fragmento de datos que un servidor envía a al navegador web del usuario, que puede almacenarlo y devolverlo al mismo servidor. Se suele utilizar para saber si dos solicitudes proceden del mismo navegador.
Las cookies se suelen utilizar para:
* Gestión de sesiones (inicios de sesión de usuarios).
* Personalización (preferencias del usuario).
* Seguimiento (análisis del comportamiento del usuario).

###Creating Cookies
####Set-Cookie and Cookie headers
La cabecera de respuesta HTTP Set-Cookie se utiliza para enviar cookies desde el servidor al usuario. Una cookie sencilla se puede configurar de la siguiente manera:

~~~
Set-Cookie: <cookie-name>=<cookie-value>
~~~

El servidor le dice al cliente que almacene una cookie. La respuesta enviada al navegador contendrá el encabezado Set-Cookie y el navegador almacenará la cookie.

~~~
HTTP/1.0 200 OK
Content-type: text/html
Set-Cookie: yummy_cookie=choco
Set-Cookie: tasty_cookie=strawberry
~~~

Ahora, con cada nueva solicitud al servidor, el navegador enviará todas las cookies previamente almacenadas al servidor usando cookie headers.

~~~
GET /sample_page.html HTTP/1.1
Host: www.example.org
Cookie: yummy_cookie=choco; tasty_cookie=strawberry
~~~

####Session Cookies
Las cookies de sesión se eliminan cuando el cliente se cierra, solo están activas durante la sesión.

####Permanent Cookies
Este tipo de cookies, en vez de expirar al cerrar la sesión del clientes, estas caducan en una fecha específica (Expires) o después de un período de tiempo específico (Max-Age).

~~~
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT;
~~~

En este ejemplo, se establece una Set-Cookie que permanecerá abierta hasta el siguiente Miércoles a partir del 21 de Octubre de 2015.

####Secure and HttpOnly cookies
Una Secure Cookie sólo se enviará al servidor cuando se realice una solicitud utilizando los protocolos SSL y HTTPS. Las HttpPnly cookies no son accesibles a través de JavaScript con las propiedades Document.cookie, las API XMLHttpRequest y Request.

Para añadir estos dos tipos de cookies a nuestro Set-Cookie, debemos poner:

~~~
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
~~~

####Scope of ookies (alcance de las cookies)
Las directivas de dominio y ruta definen el ámbito de la cookie, es decir, el conjunto de URL a las que se deben enviar las cookies.
El **dominio** especifica los hosts a los que se enviará la cookie. Si no se especifica, el valor predeterminado es la parte del host de la ubicación del documento actual (pero sin incluir subdominios). Si se especifica un dominio, los subdominios siempre se incluyen. Por ejemplo, si especificamos un ~~~Domain=mozilla.org~~~, las cookies se incluyen en subdominios como ~~~developer.mozilla.org~~~.
**Path** indica una ruta de acceso de URL que debe existir en el recurso solicitado antes de enviar el Cookie header. El carácter slash ("/") se interpreta como un separador de directorios y los subdirectorios se emparejarán también. Por ejemplo, si establecemos ~~~Path=/docs~~~, rutas válidas podrían ser: "/docs", "/docs/Web/" o "/docs/Web/HTTP".

####SameSite cookies
Este tipo de cookie permiten a los servidores afirmar que una cookie no debe enviarse junto con el resto de solicitudes.

####JavaScript access using Document.cookies
Para crear nuevas cookies, podemos utilizar la propiedad **Document.cookie**, pudiendo acceder a las cookies creadas anteriormente (en el caso de que no tengan el inidicar HttpOnly).
~~~
document.cookie = "yummy_cookie=choco"; 
document.cookie = "tasty_cookie=strawberry"; 
console.log(document.cookie); 
~~~

###Security
####Session hijacking and XSS
Las cookies se utilizan a menudo en la aplicación web para identificar un usuario y su sesión autenticada. Así que robar una cookie de una aplicación web puede llevar a secuestrar la sesión del usuario autenticado. Las maneras comunes de robar cookies incluyen el uso de la ingeniería social o explotando una vulnerabilidad XSS en la aplicación.
Para prevenir esto podemos utilizar la HttpOnly Cookie:

####Cross-site request forgery (CSRF) (Falsificación de solicitudes entre sitios)
Se pueden utilizar enlaces con direcciones engañosas en las que al entrar te pueden robar los datos de usuario. Para prevenir esto, hay varias técnicas diponibles:
* Un filtrado de entradas.
* Obligar a confirmar cualquier acción sensible.
* Las cookies utilizadas para acciones sensibles deben tener una vida útil corta.

###Tracking and Privacy (Cookies de seguimiento y privacidad)
####Thrid-party cookies (Cookies de terceros)
Las cookies tienen un dominio asociado a ellas. Si este dominio es el mismo que el dominio de la página en la que se encuentra, se dice que las cookies son una cookie de primera persona. Si el dominio es diferente, se dice que es una cookie de terceros. Si bien las cookies de primera persona se envían únicamente al servidor que las establece, una página web puede contener imágenes u otros componentes almacenados en servidores de otros dominios (como los banners publicitarios). Las cookies de terceros se utilizan principalmente para publicidad y seguimiento en toda la red.

####EU cookie directive
La directiva de la UE significa que antes de que alguien pueda almacenar o recuperar cualquier información de un ordenador, teléfono móvil u otro dispositivo, el usuario debe dar su consentimiento para hacerlo.


##Set-cookie (ya lo hago yo que es un apartado del primer punto y lo meteré ahi. Lo dificil son los ejemplos -.-)

##Wikipedia: Query String

##Cookie Module

##Cookie Management in Express

##A very basic session auth in node.js with express.js
