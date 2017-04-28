'use strict';
require('./lib/conectar_mongoose');
require('./models/Anuncio');
require('./models/Usuario');

const mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');
var Usuario = mongoose.model('Usuario');

const anuncio1 = {
<<<<<<< HEAD
    "nombre": "Bicicleta",
    "venta": true,
    "precio": 230.15,
    "foto": "bici.jpg",
    "tags": [ "lifestyle", "motor"]
};

const anuncio2 = {
    "nombre": "iPhone 3GS",
    "venta": false,
    "precio": 50.00,
    "foto": "iphone.png",
    "tags": [ "lifestyle", "mobile"]
}

const usuario = {
    "nombre": "pepa",
    "email": "pepa@email.com",
    "clave": "7b0119562a75c9aeb2c17c16796aa605"

};

function desconectarBD(){
    mongoose.disconnect(err =>{
            if(err){
                console.log('error al cerrar la conexión');
                return;
            }
            console.log('Cerrada la conexión con éxito');
        });
}
=======
    "nombre": "Boligrafo",
    "precio": 20,
    "venta": true,
    "foto": "boligrafo.jpg",
    "tags": ["escolar", "oficina"]
};

const anuncio2 = {
    "nombre": "Libro",
    "precio": 24,
    "venta": true,
    "foto": "libro.jpg",
    "tags": ["ocio","cultura"]
}
const anuncio3 = {
    "nombre": "Caja",
    "precio": 240,
    "venta": true,
    "foto": "caja.png",
    "tags": ["ocio","cultura"]
}


const usuario = {
    'nombre' : 'Manolo',
    'email' :   'manolo@email.com',
    'clave' :   '3333'

};

>>>>>>> a600e9d3ca11d6713991965dfd711bdceb6ecb89

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
<<<<<<< HEAD
    .then(us =>{
        return anadirUsuario(usuario)})
    .then(()=>{
        desconectarBD();
    })
    .catch((err)=>{
        desconectarBD();
=======
   .then(an =>{
        return anadirAnuncio(anuncio3)})
    .then(us =>{
        return anadirUsuario(usuario)})
    .catch((err)=>{
>>>>>>> a600e9d3ca11d6713991965dfd711bdceb6ecb89
        console.log(err);
    });
    

