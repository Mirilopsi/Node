'use strict';
require('./lib/conectar_mongoose');
require('./models/Anuncio');
require('./models/Usuario');

const mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');
var Usuario = mongoose.model('Usuario');

const anuncio1 = {
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
        return anadirUsuario(usuario)})
    .then(()=>{
        desconectarBD();
    })
    .catch((err)=>{
        desconectarBD();
        console.log(err);
    });
    

