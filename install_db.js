'use strict';
require('./lib/conectar_mongoose');
require('./models/Anuncio');
require('./models/Usuario');

const mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');
var Usuario = mongoose.model('Usuario');

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


const usuario1 = {
    'nombre' : 'Paco',
    'email' : 'paco@email.com',
    'clave' : '1111'
};

const usuario2 = {
    'nombre' : 'Pepe',
    'email' : 'pepe@email.com',
    'clave' :   '2222'
};

const usuario3 = {
    'nombre' : 'Manolo',
    'email' :   'manolo@email.com',
    'clave' :   '3333'

};


function inicializarBD(){
    return new Promise ((resolve,reject)=>{
        Anuncio.db.dropDatabase((err) =>{
            if(err){
                reject(new Error('ERRORRR!!!!'));
                return;
            }
            console.log('success');
            resolve(null);
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
            console.log('anuncio guardado');
            resolve(null);
        });
    });
}

function anadirUsuario(us){
    const usuario = new Usuario(us);

    return new Promise((resolve, reject)=>{

        usuario.save((err, guardado)=>{
            if(err){
                reject(new Error('ERROR!!'));
                return;
            }
            console.log('usuario guardado');
            resolve(null);
        });
    });
}

inicializarBD()
    .then(an => {
        return anadirAnuncio(anuncio1)})
    .then(an =>{
        return anadirAnuncio(anuncio2)})
    .then(us =>{
        return anadirUsuario(usuario1)})
    .then(us =>{
        return anadirUsuario(usuario2)})
    .then(us =>{
        return anadirUsuario(usuario3)})
    .catch((err)=>{
        console.log(err);
    });
    

