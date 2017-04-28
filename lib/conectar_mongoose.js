'use strict';

//Vamos a crar la conexión a la bd
const mongoose = require('mongoose');
<<<<<<< HEAD

mongoose.Promise = global.Promise;

=======
>>>>>>> a600e9d3ca11d6713991965dfd711bdceb6ecb89
const con = mongoose.connection;

//Si hay error notificamos
con.on('error', console.error.bind(console, 'Error al conectar con la base de datos'));

//Abrimos solo una vez la conexión
con.once('open', function(){
    console.info('Conectado a mongodb');
});

mongoose.connect('mongodb://localhost/nodepop');