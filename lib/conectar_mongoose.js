'use strict';

//Vamos a crar la conexión a la bd
const mongoose = require('mongoose');
const con = mongoose.connection;

//Si hay error notificamos
con.on('error', console.error.bind(console, 'Error al conectar con la base de datos'));

//Abrimos solo una vez la conexión
con.once('open', function(){
    console.info('Conectado a mongodb');
});

mongoose.connect('mongodb://localhost/nodepop');