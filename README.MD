# Aprendiendo a crear restful APIs con **NodeJS**
## utilizando la libreria **Express** y **pg**

- Para instalar Express y guardar una copia local: npm install express --save
- Para instalar body-parser: npm install body-parser --save
- Para instalar pg: npm install pg --save

### ¿Que se necesita para continuar con el tutorial?
- Necesitas saber HTML porque internet funciona con HTML.
- Necesitas saber CSS para darle un buen aspecto a la pagina.
- Necesitas saber javascript para darle dinamismo a la pagina
  - es importante saber **JSON=javascript object notation**
  - ejemplo:
    - ```json {"nombre":"carlos","apellido":"perez","edad":45,"libros":["montecristo","cien años de soledad","peter pan"],"familiares":[{"nombre":"margarito","apellido":"perez"},{"nombre":"jon"}]} ```
- Necesitas un framework para javascript tanto para frontend y backend
  - para frontend puede ser **Angularjs**.
  - para backend puede ser **Express**.
  - Nota: es importante que sepas que existen muchas librerias y herramientas para front y backend.
- Necesitas una base de datos donde guardar
  - para este caso vamos a utilizar **Postgresql**

### ¿De que se compone un proyecto web?
cuando se crea un proyecto web con rest api, significa que el proyecto esta dividido en 2 partes:
- Front end
  - es el conjunto de paginas web de un sitio que interactuan con el usuario.
  - se encarga de realizar solicitudes json al backend con el objetivo de responder al usuario.
- Backend
  - el backend **restful-api** es la aplicacion web que recibe solicitudes (requests) con contenido json y devuelve respuestas con contenido json. las solicitudes pueden ser 4:
    - GET: sirve para obtener un objeto en formato json.
    - POST: sirve para crear un nuevo objeto
    - PUT: sirve para modificar un nuevo objeto
    - DELETE: sirve para eliminar un objeto
### Ejemplo
- colocar una url en el navegador significa hacer una solicitud **GET** a un recurso en el caso mas comun una pagina web
- cuando se llena un formulario y se presiona submit lo mas probable se esta ejecutando una solicitud **POST**.
- se puede verificar el funcionamiento de las solicitudes utilizando herramientas como **postman**, **arc**, **restclient**, etc

### Referencias
- Ejercicio tomado de [aqui](https://medium.com/@asfo/desarrollando-una-sencilla-api-rest-con-nodejs-y-express-cab0813f7e4b) y mejorado con operaciones de base de datos postgres.