//importando componente para parsear el body de la solicitud (req.body)
const bodyParser = require('body-parser');

//importando pg para conexion y consulta de base de datos postgres
const {Client}=require('pg');

//configurando la conexion a la base de datos en postgres
client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
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
//var usuario = {nombre:'',apellido:''}, respuesta={};

/*conectandome a la base de datos*/
client.connect(
    function(err){ 
        if(err) {return ;} 
        console.log("Connected to database!"); 
    });

/* Respondiendo a solicitud get en la ruta /usuario */
app.get('/usuario/:usuario/:apellido', function (req, _res) {
    
    client.query('SELECT nombre,apellido from usuarios where nombre=$1::text and apellido=$2::text', [req.params.usuario,req.params.apellido], (err, res) => 
    {	
		/*si el usuario existe*/
		if(res.rows.length>0)
        {	
			console.log('GET buscando usuario');
			respuesta = {
				error: false,
				codigo: 200,
				mensaje: 'todo salio bien',
				usuario: {
					nombre : res.rows[0].nombre,
					apellido : res.rows[0].apellido
				}
			};
		}
		else
		{
			console.log('GET usuario no encontrado');
			respuesta ={
				error: true,
				codigo: 400,
				mensaje: 'El usuario no existe en la base de datos'
			};
		}	
		_res.send(respuesta);
	});
});

/* creando un nuevo usuario */
app.post('/usuario', function (req, _res) {
	client.query('select * from usuarios where nombre=$1::text and apellido=$2::text',[req.body.nombre,req.body.apellido], (err,res_select) =>
	{
		if(res_select.rows.length==0){
			client.query('insert into usuarios values($1::text,$2::text)', [req.body.nombre,req.body.apellido], (err, res) =>
			{
				console.log("POST creando un nuevo usuario")
				/*codigo para validar que el insert se hizo bien*/
				let respuesta = 
				{
					error:false,
					codigo:200,
					mensaje:'usuario creado',
					usuario: {
						nombre: req.body.nombre,
						apellido: req.body.apellido
					}
				}
				_res.send(respuesta);
			});
		}
		else
		{
			console.log("usuario ya existe");
			let respuesta = 
				{
					error:true,
					codigo:401,
					mensaje:'usuario no creado',
					usuario: {
						nombre: req.body.nombre,
						apellido: req.body.apellido
					}
				}
			_res.send(respuesta);
		}
	});
});

/*actualizando un usuario*/
app.put('/usuario/:usuario/:apellido', function (req, _res) {
	client.query('update usuarios set nombre=$1::text,apellido=$2::text where nombre=$3::text and apellido=$4::text', [req.body.nombre,req.body.apellido,req.params.usuario,req.params.apellido], (err, res) =>
	{
		console.log("PUT actualizando usuario")
		/*falta agregar codigo para validar si la consulta si hizo bien*/
		let respuesta = 
		{
			error:false,
			codigo:200,
			mensaje:'usuario modificado',
			usuario: {
				nombre: req.body.nombre,
				apellido: req.body.apellido
			}
		}
		_res.send(respuesta);
	});
});

/*elimina un usuario del sistema*/
app.delete('/usuario', function (req, _res) {
	client.query('delete from usuarios where nombre=$1::text and apellido=$2::text', [req.body.nombre,req.body.apellido], (err, res) =>
	{
		console.log("DELETE eliminando usuario")
		/*agregar codigo para validar si se elimino el registro*/
		let respuesta = 
		{
			error:false,
			codigo:200,
			mensaje:'usuario eliminado',
			usuario: {
				nombre: req.body.nombre,
				apellido: req.body.apellido
			}
		}
		_res.send(respuesta);
	});
});

//Metodo GET para los equipos
app.get('/equipos/:equipo', function(req, _res){
	client.query('SELECT * from equipos where nombre=$1::text', [req.params.equipo], (err, res) =>
	{
		//si el equipo existe
		if(res.rows.length>0)
		{
			client.query('select j.nombre as nombre,j.apellido from equipos e inner join jugadores j on e.nombre = j.equipo where j.equipo = $1::text', [req.params.equipo], (joinerr, joinres) =>
			{
				console.log('GET buscando equipo');
									
				respuesta = {
					error: false,
					codigo: 200,
					mensaje: 'Todo salio bien',
					equipo: {
						nombre: res.rows[0].nombre,
						pais: res.rows[0].pais,
						creacion: res.rows[0].creacion,
						logo: res.rows[0].logo,
						ganados: res.rows[0].ganados,
						jugadores: joinres.rows
					}
				};
				_res.send(respuesta);

			});

		}
		else
		{
			console.log('GET equipo no encontrado');
			respuesta = {
				error: true,
				codigo: 404,
				mensaje: 'equipo no encontrado',
			};
			_res.send(respuesta);

		}
		
	});

});

//Metodo POST para los equipos
app.post('/equipos', function(req, _res){
	client.query('SELECT * from equipos where nombre=$1::text', [req.body.nombre], (err, res_select) =>
	{
		if(res_select.rows.length==0){
			client.query('INSERT into equipos values($1::text,$2::text,$3::date,$4::text,$5::text)', [req.body.nombre,req.body.pais,req.body.creacion,req.body.logo,req.body.ganados], (errorDB, res) =>
			{
				console.log("POST creando un nuevo equipo");
				console.log(errorDB);
				//codigo para validar que el equipo se inserto bien
				let respuesta =
				{
					error: false,
					codigo: 200,
					mensaje: 'Equipo Creado',
					equipo: {
						nombre: req.body.nombre,
						pais: req.body.pais,
						creacion: req.body.creacion,						
						logo: req.body.logo,	
						ganados: req.body.ganados					
					}
				}
				_res.send(respuesta);
			});
		}
		else
		{
			console.log("Equipo ya existe");
			let respuesta =
			{
				error: true,
				codigo: 404,
				mensaje: 'Equipo no creado',
				equipo: {
					nombre: req.body.nombre,
					pais: req.body.pais,
					creacion: req.body.creacion,
					logo: req.body.logo,	
					ganados: req.body.ganados									
				}
			}
			_res.send(respuesta);
		}				
	});

});

//Metodo PUT para actualizar la tabla equipos
app.put("/equipos/:nombre", function(req, _res){
	client.query('UPDATE equipos set nombre=$1::text, pais=$2::text, creacion=$3::date, logo=$4::text, ganados=$5::text WHERE nombre=$6::text',	[req.body.nombre,req.body.pais,req.body.creacion,req.body.logo,req.body.ganados,req.params.nombre], (errorDB, res) =>
	{
		console.log('PUT actualizando equipo');
		console.log(errorDB);
		let respuesta =
		{
			error: false,
			codigo: 200,
			mensaje: 'equipo modificado',
			equipo: {
				nombre: req.body.nombre,
				pais: req.body.pais,
				creacion: req.body.creacion,
				logo: req.body.logo,
				ganados: req.body.ganados
			}
		}
		_res.send(respuesta);
	});

});

//Metodo DELETE para eliminar equipos
app.delete('/equipos', function(req, _res){
	client.query('DELETE from equipos where nombre=$1::text', [req.body.nombre], (errorDB, res) => 
	{
		console.log('DELETE eliminando equipo');
		console.log(errorDB);
		let respuesta =
		{
			error: false,
			codigo: 200,
			mensaje: 'equipo eliminado',
			equipo: {
				nombre: req.body.nombre
			}
		}
		_res.send(respuesta);
	});

});

//Metodo GET para los jugadores
app.get('/jugadores/:nombre/:apellido', function(req, _res){
	client.query('SELECT * FROM jugadores WHERE nombre=$1::text AND apellido=$2::text', [req.params.nombre,req.params.apellido], (errorDB, res) =>
	{
		//si el jugador existe
		if(res.rows.length>0)
		{
			console.log('GET buscando jugador');
			console.log(errorDB);

			respuesta =
			{
				error: false,
				codigo: 200,
				mensaje: 'todo salio bien',
				jugador: {
					nombre: res.rows[0].nombre,
					apellido: res.rows[0].apellido,
					nacimiento: res.rows[0].nacimiento,
					nacionalidad: res.rows[0].nacionalidad,
					equipo: "/equipo/"+res.rows[0].equipo
				}
			}
		}
		else
		{
			console.log('GET jugador no encontrado');
			respuesta = {
				error: true,
				codigo: 404,
				mensaje: 'El jugador no existe'
			}

		}
		_res.send(respuesta);
	}); 
	
});

//Metodo POST para agregar jugadores
app.post('/jugadores', function(req, _res) {
	client.query('SELECT * FROM jugadores WHERE nombre=$1::text AND apellido=$2::text', [req.body.nombre,req.body.apellido], (err, res_select) =>
	{
		if(res_select.rows.length==0){
			client.query('INSERT INTO jugadores VALUES($1::text,$2::text,$3::date,$4::text,$5::text)', [req.body.nombre,req.body.apellido,req.body.nacimiento,req.body.nacionalidad,req.body.equipo], (errorDB,res) =>
			{
				console.log('POST creando un nuevo jugador');
				console.log(errorDB);
				//codigo para validar si todo esta bien
				let respuesta = 
				{
					error: false,
					codigo: 200,
					mensaje: 'jugador agregado',
					jugador: {
						nombre: req.body.nombre,
						apellido: req.body.apellido,
						nacimiento: req.body.nacimiento,
						nacionalidad: req.body.nacionalidad,
						equipo: req.body.equipo
					}
				}
				_res.send(respuesta);
			});
		}
		else
		{
			console.log('jugador ya existe');
			let respuesta =
			{
				error: true,
				codigo: 404,
				mensaje: 'jugador no creado',
				jugador: {
					nombre: req.body.nombre,
					apellido: req.body.apellido,
					nacimiento: req.body.nacimiento,
					nacionalidad: req.body.nacionalidad,
					equipo: req.body.equipo
				}
			}
			_res.send(respuesta);
		}
		
	});

});

//Metodo PUT para actualizar jugadores
app.put('/jugadores/:nombre/:apellido', function(req, _res){
	client.query('UPDATE jugadores set nombre=$1::text,apellido=$2::text,nacimiento=$3::date,nacionalidad=$4::text,equipo=$5::text WHERE nombre=$6 AND apellido=$7::text', [req.body.nombre,req.body.apellido,req.body.nacimiento,req.body.nacionalidad,req.body.equipo,req.params.nombre,req.params.apellido], (err, res) =>
	{
		console.log("PUT actualizando jugador")
		console.log(err)
		let respuesta =
		{
			error: false,
			codigo: 200,
			mensaje: 'jugador modificado',
			jugador: {
				nombre: req.body.nombre,
				apellido: req.body.apellido,
				nacimiento: req.body.nacimiento,
				nacionalidad: req.body.nacionalidad,
				equipo: req.body.equipo
			}
		}
		_res.send(respuesta);
	});
});

//Metodo para eliminar jugadores
app.delete('/jugadores', function(req, _res){
	client.query('DELETE FROM jugadores WHERE nombre=$1::text AND apellido=$2::text', [req.body.nombre,req.body.apellido], (err, res) =>
	{
		console.log('DELETE eliminando jugador');
		console.log(err);

		let respuesta =
		{
			error: false,
			codigo: 200,
			mensaje: 'jugador eliminado',
			jugador: {
				nombre: req.body.nombre,
				apellido: req.body.apellido,
				nacimiento: req.body.nacimiento,
				nacionalidad: req.body.nacionalidad,
				equipo: req.body.equipo
			}
		}
		_res.send(respuesta);
	});

});

//Metodo GET para las tranferencias
app.get('/transferencias/:fecha', function(req, _res){
	client.query('SELECT * FROM transferencias WHERE fecha=$1::date', [req.params.fecha], (err, res) =>
	{
		//si la fecha esta correcta
		if(res.rows.length>0)
		{
			console.log('GET buscando transferencias');
			console.log(err);

			let respuesta = {
				error: false,
				codigo: 200,
				mensaje: 'todo salio bien',
				transferencias: {
					jugadores: res.rows
					/*nombre: res.rows[0].nombre,
					apellido: res.rows[0].apellido,
					equipo_inicial: '/equipo/' + res.rows[0].equipo_inicial,
					equipo_final: '/equipo/' + res.rows[0].equipo_final,
					fecha: res.rows[0].fecha*/
				}
			}
			_res.send(respuesta);

		}
		else
		{
			console.log('GET No se encontro transferencias');
			respuesta = {
				error: true,
				codigo: 404,
				mensaje: 'transferencia no existe'
			}

		}

	});
});

//Metodo para agregar transferencias
app.post('/transferencias', function(req, _res){
	client.query('INSERT INTO transferencias VALUES($1::text, $2::text, $3::text, $4::text, $5::date)', [req.body.nombre,req.body.apellido,req.body.equipo_inicial,req.body.equipo_final,req.body.fecha], (errorDB, insert_res) =>
	{		
		//si se inserto correctamente
		if(errorDB)
		{
			console.log('Equipo de jugador no actualizado');
			console.log(errorDB);
			let respuesta =
			{
				error: true,
				codigo: 404,
				mensaje: 'Equipo no actualizado',
				jugador: {
					nombre: req.body.nombre,
					apellido: req.body.apellido,
					equipo: req.body.equipo_final
				}
			}
			_res.send(respuesta);
		}
		else
		{
			client.query('UPDATE jugadores SET equipo=$1::text WHERE nombre=$2::text AND apellido=$3::text', [req.body.equipo_final,req.body.nombre,req.body.apellido], (err, res) =>
			{
				console.log('PUT actualizando equipo');
				console.log(err);

				let respuesta = 
				{
					error: false,
					codigo: 200,
					mensaje: 'Equipo de jugador actualizado',
					jugador: {
						nombre: req.body.nombre,
						apellido: req.body.apellido,
						equipo: req.body.equipo_final
					}

				}
				_res.send(respuesta);

			});
		}

	});

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
