//importando componente para parsear el body de la solicitud (req.body)
const bodyParser = require('body-parser');

//importando pg para conexion y consulta de base de datos postgres
const {Client}=require('pg');

//configurando la conexion a la base de datos en postgres
client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'xxxxxx',
    database: 'usuarios',
});

//creando la aplicacion de express
const express = require("express");
const app = express();

//aplicando la interpretacion de  la solicitud
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Respondiendo a solicitud get en la raiz */
app.get('/', function(req, res) {
    let respuesta = {
        error: true,
        codigo: 200,
        mensaje: 'Aplicacion creada para probar express y postgres'
        };
    res.send(respuesta);
    });

/* variables globales*/     
var usuario = {nombre:'',apellido:''},respuesta={};

/*conectandome a la base de datos*/
client.connect(
    function(err){ 
        if(err) {return ;} 
        console.log("Connected"); 
    });

/* Respondiendo a solicitud get en la ruta /usuario */
app.get('/usuario/:usuario', function (req, res) {
    
    client.query('SELECT nombre,apellido from usuarios where nombre=$1::text', [req.params.usuario], (err, res) => 
    {
        if(res.rows.length>0)
        {
        usuario.nombre = res.rows[0].nombre;
        usuario.apellido = res.rows[0].apellido;
        }
        else
            usuario.nombre = '';
    });

    if(usuario.nombre=='')
    {
        respuesta = {
            error: true,
            codigo: 200,
            mensaje: 'todo salio mal'};
    }
    else
    {
        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'todo salio bien',
            respuesta: usuario
        };
    }
    res.send(respuesta);

});

/* creando un nuevo usuario */
app.post('/usuario', function (req, res) {
    client.query('insert into usuarios values($1::text,$2::text)', [req.body.nombre,req.body.apellido], (err, res) => {})
    /*codigo para validar que el insert se hizo bien*/
    let respuesta = 
    {
        error:false,
        codigo:200,
        mensaje:'usuario creado',
        respuesta: {
            nombre: req.body.nombre,
            apellido: req.body.apellido
        }
    }
    res.send(respuesta);
});

/*actualizando un usuario*/
app.put('/usuario/:usuario', function (req, res) {
    client.query('update usuarios set nombre=$1::text,apellido=$2::text where nombre=$3::text', [req.body.nombre,req.body.apellido,req.params.usuario], (err, res) => {})
    /*falta agregar codigo para validar si la consulta si hizo bien*/
    let respuesta = 
    {
        error:false,
        codigo:200,
        mensaje:'usuario modificado',
        respuesta: {
            nombre: req.body.nombre,
            apellido: req.body.apellido
        }
    }
    res.send(respuesta);
});

/*elimina un usuario del sistema*/
app.delete('/usuario', function (req, res) {
    client.query('delete from usuarios where nombre=$1::text and apellido=$2::text', [req.body.nombre,req.body.apellido], (err, res) => {})
    /*agregar codigo para validar si se elimino el registro*/
    let respuesta = 
    {
        error:false,
        codigo:200,
        mensaje:'usuario eliminado',
        respuesta: {
            nombre: req.body.nombre,
            apellido: req.body.apellido
        }
    }
    res.send(respuesta);
});

/*mostrar error en caso de no existir la url*/
app.use(function(req, res, next) {
 respuesta = {
  error: true, 
  codigo: 404, 
  mensaje: 'URL no encontrada'
 };
 res.status(404).send(respuesta);
});

/*pone el servidor a trabajar en el puerto 3000*/
app.listen(3000, () => {
 console.log("El servidor está inicializado en el puerto 3000");
});