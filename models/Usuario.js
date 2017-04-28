'use strict'

const mongoose = require('mongoose');

//Creamos la estructura que tendrá el modelo de usuario
const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: {
        type: String,
        index: true,
        unique: true},
    clave: String
});

//Creamos metodo para obtener la lista de usuarios que hay hasta el momento
usuarioSchema.statics.list = function(criterios,callback){
    const query = Usuario.find(criterios);

    query.exec(callback);
};


//Creamos el modelo de usuario
<<<<<<< HEAD
var Usuario = mongoose.model('Usuario', usuarioSchema);

=======
var Usuario = mongoose.model('Usuario', usuarioSchema);
>>>>>>> a600e9d3ca11d6713991965dfd711bdceb6ecb89
