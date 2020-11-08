# Basico de como crear restful APIs con **NodeJS** y **Postgresql**
### ¿Que se necesita para continuar con el tutorial?
- Necesitas saber HTML porque internet funciona con HTML.
- Necesitas saber CSS para darle un buen aspecto a la pagina.
- Necesitas saber javascript para darle dinamismo a la pagina
  - Es importante saber **JSON=javascript object notation**
  - Ejemplo:
    - ```javascript {"nombre":"carlos","apellido":"perez","edad":45,"libros":["montecristo","cien años de soledad","peter pan"],"familiares":[{"nombre":"margarito","apellido":"perez"},{"nombre":"jon"}]}```
### ¿Que hay que installar
- [visual studio code](https://code.visualstudio.com/)
- [nodejs](https://nodejs.org/es/)
- [posgresql](https://www.postgresql.org/)
- [git](https://git-scm.com/)
### Crear proyecto en node js
- Elegir un folder de trabajo
- Clonar el repositorio actual
  - ```git clone https://github.com/jhrodix/nodejs-restapi-learning.git```
- Ejecutar npm init en el directorio actual
### ¿Que librerias se ocupan instalar en nodejs?
- Para instalar Express y guardar una copia local: ```npm install express --save```
- Para instalar body-parser: ```npm install body-parser --save```
- Para instalar pg: ```npm install pg --save```
### Instalando base de datos
- Ejecutar el script sql del proyecto sobre una base de datos postgres.
- En el archivo index.js se puede configurar el usuario, servidor y nombre de la base de datos a utilizar.
- Solo se requiere una tabla llamada usuarios con dos columnas tipo varchar nombre y apellido.
### ¿De que se compone un proyecto web?
No se compone de flont end solo backend. Cuando se crea un proyecto web con rest api, significa que el proyecto esta dividido en 2 partes:
- Front end
  - es el conjunto de paginas web de un sitio que interactuan con el usuario.
  - se encarga de realizar solicitudes json al backend con el objetivo de responder al usuario.
- Backend
  - Para simple entendiemiento sin profundizar mucho en la teoria, el backend **restful-api** es la aplicacion web que recibe solicitudes (requests) con contenido json y devuelve respuestas con contenido json sin utilizar session. las solicitudes pueden ser 4:
    - **GET**: sirve para obtener un objeto en formato json.
    - **POST**: sirve para crear un nuevo objeto
    - **PUT**: sirve para modificar un nuevo objeto
    - **DELETE**: sirve para eliminar un objeto
  - Si queres profundizar en la [teoria](https://www.ics.uci.edu/~fielding/pubs/dissertation/fielding_dissertation.pdf)
### Ejemplo de como probar el webapi
- Finalmente para probar el app hay que ejecutar ```node index.js```
- Tambien cuando se coloca una url en el navegador significa hacer una solicitud **GET** a un recurso en el caso mas comun una pagina web.
- Cuando se llena un formulario y se presiona submit lo mas probable se esta ejecutando una solicitud **POST**.
- Se puede verificar el funcionamiento de las solicitudes utilizando herramientas como **postman**, **arc**, **restclient**, etc
- El archivo test.http contiene ejemplo del uso de las 4 solicitudes que se pueden realizar (requiere instalar en vscode **restclient**).
### Referencias
- Ejercicio tomado de [aqui](https://medium.com/@asfo/desarrollando-una-sencilla-api-rest-con-nodejs-y-express-cab0813f7e4b) y mejorado con operaciones de base de datos postgres.