/*
usuario1 = {
    'nombre' : 'Paco',
    'email' : 'paco@email.com',
    'clave' : '1111'
};

usuario2 = {
    'nombre' : 'Pepe',
    'email' : 'pepe@email.com',
    'clave' :   '2222'
};

usuario3 = {
    'nombre' : 'Manolo',
    'email' :   'manolo@email.com',
    'clave' :   '3333'

};

console.log('usuarios cargados en la bd');
*/

'use strict';
require('./lib/conectar_mongoose');
require('./models/Anuncio');

const mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');

const anuncio1 = {
    "nombre": "Caja",
    "precio": 20,
    "venta": true,
    "foto": "fotoBoligrafo.jpeg",
    "tags": ["escolar", "oficina"]
};

const anuncio2 = {
    "nombre": "portafolios",
    "precio": 24,
    "venta": true,
    "foto": "fotoLibro.jpeg",
    "tags": ["ocio","cultura"]
}

function inicializarBD(){
    return new Promise ((resolve,reject)=>{
        Anuncio.db.dropDatabase((err) =>{
            if(err){
                reject(new Error('ERRORRR!!!!'));
                return;
            }
            console.log('success');
            return resolve(null);
        });
    });
}


function anadirAnuncio(an){
    const anuncio = new Anuncio(an);

    return new Promise((resolve, reject)=>{

        anuncio.save((err, guardado)=>{
            if(err){
                reject(new Error('ERROR!!'));
                return;
            }
            console.log(guardado);
            return resolve(null);
        });
    });
}
console.log(anuncio1);

inicializarBD()
    .then(an => {
        return anadirAnuncio(anuncio1)})
    .then(an =>{
        return anadirAnuncio(anuncio2)})
    .catch((err)=>{
        console.log(err);
    });
    

