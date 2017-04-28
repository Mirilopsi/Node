'use strict'

const mongoose = require('mongoose');

//Creamos la estructura que tendrá el anuncio
const anuncioSchema = mongoose.Schema({
<<<<<<< HEAD
    nombre: {
        type: String,
        index: true },
    precio: Number,
    venta: Boolean,
    foto: {
        type: String,
        index: true },
    tags: [String]
});


//Creamos metodo para obtener la lista de anuncios que hay hasta el momento
anuncioSchema.statics.list = function(criterios,tags, limit, skip, select,sort,callback){
=======
    nombre: String,
    precio: Number,
    venta: Boolean,
    foto: String,
    tags: [String]
});

//Creamos metodo para obtener la lista de anuncios que hay hasta el momento
anuncioSchema.statics.list = function(criterios,limit, skip, select,sort,callback){
>>>>>>> a600e9d3ca11d6713991965dfd711bdceb6ecb89
    const query = Anuncio.find(criterios);
    
    query.limit(limit);
    query.skip(skip);
    query.select(select);
    query.sort(sort);
<<<<<<< HEAD
=======

>>>>>>> a600e9d3ca11d6713991965dfd711bdceb6ecb89
    query.exec(callback);

};


//Creamos el modelo de anuncio
var Anuncio = mongoose.model('Anuncio', anuncioSchema);