# Aprendiendo a crear restful APIs con **NodeJS**
## utilizando la libreria **Express** y **body-parser**

- Para instalar Express y guardar una copia local: npm install express --save
- Para instalar body-parser: npm install body-parser --save
- Para instalar pg: npm install pg --save


### Explicacion de componentes y herramientas para desarrollar un sitio web moderno
- Necesitas saber HTML porque internet funciona con HTML.
- Necesitas saber CSS para buen aspecto a la pagina.
- Necesitas saber javascript para darle dinamismo a la pagina
  - es importante saber **JSON=javascript object notation**
  - ejemplo:
    - ```json {"nombre":"carlos","apellido":"perez","edad":45,"libros":["montecristo","cien años de soledad","peter pan"],"familiares":[{"nombre":"margarito","apellido":"perez"},{"nombre":"jon"}]} ```
- Necesitas un framework para javascript para frontend y backend
  - para frontend puede ser angularjs.
  - para backend puede ser express.
  - Nota: es importante que sepas que existen muchas librerias y herramientas para front y backend.
- Necesitas un base de datos donde guardar
  - para este caso vamos a utilizar **Postgresql**

### Explicacion de un proyecto web
cuando se crea un proyecto web con rest api; significa que el esta dividido en 2 partes:
- front end
- backend

el backend **restful-api** es la aplicacion web que recibe solicitudes (requests) con contenido json y devuelve respuestas con contenido json. las solicitudes pueden ser 4:
- GET: sirve para obtener un objeto en formato json.
- POST: 
- PUT
- DELETE

colocar una url en el navegador significa hacer una solicitud **GET**


Ejercicio tomado de [aqui](https://medium.com/@asfo/desarrollando-una-sencilla-api-rest-con-nodejs-y-express-cab0813f7e4b)