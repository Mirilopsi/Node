'use strict'

const mongoose = require('mongoose');

//Creamos la estructura que tendrá el anuncio
const anuncioSchema = mongoose.Schema({
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
    const query = Anuncio.find(criterios);
    
    query.limit(limit);
    query.skip(skip);
    query.select(select);
    query.sort(sort);
    query.exec(callback);

};


//Creamos el modelo de anuncio
var Anuncio = mongoose.model('Anuncio', anuncioSchema);