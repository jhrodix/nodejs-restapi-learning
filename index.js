//importando componente para parsear el body de la solicitud (req.body)
const bodyParser = require('body-parser');

//importando pg para conexion y consulta de base de datos postgres
const {Client}=require('pg');
//configurando la conexion a la base de datos en postgres
client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'xxxxx',
    database: 'usuarios',
});

//conectandose a la base de datos
client.connect()

//creando la aplicacion de express
const express = require("express")
const app = express()

//aplicando la interpretacion de  la solicitud
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Variable global del datos que se desea gestionar via restful*/
let usuario = {
 nombre:'',
 apellido: ''
};

/* Respuesta Json que se desea devolver*/
let respuesta = {
 error: false,
 codigo: 200,
 mensaje: ''
};

/* Respondiendo a solicitud get en la raiz */
app.get('/', function(req, res) {

    client.query('SELECT nombre,apellido from usuarios where nombre=$1::text', ['Juan'], (err, res) => {
        console.log(err ? err.stack : res.rows[0].apellido) // Hello World!
        //client.end()
      })

respuesta = {
  error: true,
  codigo: 200,
  mensaje: 'Aplicacion creada para probar express y postgres'
 };
 res.send(respuesta);
});

/* Respondiendo a solicitud get en la ruta /usuario */
app.get('/usuario', function (req, res) {
 respuesta = {
  error: false,
  codigo: 200,
  mensaje: ''
 };
 if(usuario.nombre === '' || usuario.apellido === '') {
  respuesta = {
   error: true,
   codigo: 501,
   mensaje: 'El usuario no ha sido creado'
  };
 } else {
  respuesta = {
   error: false,
   codigo: 200,
   mensaje: 'respuesta del usuario',
   respuesta: usuario
  };
 }
 res.send(respuesta);
});

/* creando un nuevo usuario */
app.post('/usuario', function (req, res) {
 if(!req.body.nombre || !req.body.apellido) {
  respuesta = {
   error: true,
   codigo: 502,
   mensaje: 'El campo nombre y apellido son requeridos'
  };
 } else {
  if(usuario.nombre !== '' || usuario.apellido !== '') {
   respuesta = {
    error: true,
    codigo: 503,
    mensaje: 'El usuario ya fue creado previamente'
   };
  } else {
   usuario = {
    nombre: req.body.nombre,
    apellido: req.body.apellido
   };
   respuesta = {
    error: false,
    codigo: 200,
    mensaje: 'Usuario creado',
    respuesta: usuario
   };
  }
 }
 
 res.send(respuesta);
});

app.put('/usuario', function (req, res) {
 if(!req.body.nombre || !req.body.apellido) {
  respuesta = {
   error: true,
   codigo: 502,
   mensaje: 'El campo nombre y apellido son requeridos'
  };
 } else {
  if(usuario.nombre === '' || usuario.apellido === '') {
   respuesta = {
    error: true,
    codigo: 501,
    mensaje: 'El usuario no ha sido creado'
   };
  } else {
   usuario = {
    nombre: req.body.nombre,
    apellido: req.body.apellido
   };
   respuesta = {
    error: false,
    codigo: 200,
    mensaje: 'Usuario actualizado',
    respuesta: usuario
   };
  }
 } 
 res.send(respuesta);
});

app.delete('/usuario', function (req, res) {
 if(usuario.nombre === '' || usuario.apellido === '') {
  respuesta = {
   error: true,
   codigo: 501,
   mensaje: 'El usuario no ha sido creado'
  };
 } else {
  respuesta = {
   error: false,
   codigo: 200,
   mensaje: 'Usuario eliminado'
  };
  usuario = { 
   nombre: '', 
   apellido: '' 
  };
 }
 res.send(respuesta);
});

app.use(function(req, res, next) {
 respuesta = {
  error: true, 
  codigo: 404, 
  mensaje: 'URL no encontrada'
 };
 res.status(404).send(respuesta);
});

app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});