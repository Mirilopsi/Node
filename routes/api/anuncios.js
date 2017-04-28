'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
<<<<<<< HEAD
const Anuncio = mongoose.model('Anuncio');
const jwtAuth = require('../../lib/jwt_auth');

router.use(jwtAuth);

function filtraPrecio(precio){
    const limites = precio.split('-');
    let filtro = {};

    if(limites.length >1){
        if(limites[0] && !limites[1])    filtro = {'$gte': limites[0]};
        else if(!limites[0] && limites[1])  filtro = {'$lte': limites[1]};
        else if (limites[0] && limites[1] ) filtro = {'$gte': limites[0], '$lte': limites[1]};
    } 
    else filtro = limites[0];

    return filtro;
}
=======
//Obtenemos el Schema de anuncio
const Anuncio = mongoose.model('Anuncio');
const jwtAuth = require('../../lib/jwt_auth');

//router.use(jwtAuth);
>>>>>>> a600e9d3ca11d6713991965dfd711bdceb6ecb89

//Vamos a obtener la lista de anuncios que tenemos hasta ahora
router.get('/', (req,res, next) =>{
    const nombre = req.query.nombre;
    const precio = req.query.precio;
    const venta = req.query.venta;
    const foto = req.query.foto;
<<<<<<< HEAD
    const tag = req.query.tag;
=======
    const tags = req.query.tags;
>>>>>>> a600e9d3ca11d6713991965dfd711bdceb6ecb89
    const limit = +req.query.limit;
    const skip = +req.query.skip;
    const select = req.query.select;
    const sort = req.query.sort;

<<<<<<< HEAD
    const criterios = {};
    const nombreFiltrado = new RegExp(nombre, 'i');
    if(nombre) criterios.nombre = nombreFiltrado;
    if(venta) criterios.venta = venta; 
    if(foto) criterios.foto = foto; 
    if(tag) criterios.tags = tag; 
    if(precio) criterios.precio = filtraPrecio(precio);

    
    Anuncio.list(criterios,tag, limit, skip, select, sort,(err, anuncios)=>{
=======
    console.log(limit);
    const criterios = {};
    if(nombre) req.criterios = nombre; 
    if(precio) req.criterios = precio; 
    if(venta) req.criterios = venta; 
    if(foto) req.criterios = foto; 
    if(tags) req.criterios = tags; 

    Anuncio.list(criterios, limit, skip, select, sort,(err, anuncios)=>{
>>>>>>> a600e9d3ca11d6713991965dfd711bdceb6ecb89
        if(err){
            return next(err);
        }
        res.json({success: true, result: anuncios});
<<<<<<< HEAD
    });
});


module.exports = router;
=======

    });
});

router.get('/images/:foto', (req,res,next)=>{
    const _foto = req.params.foto;

    Anuncio.findOne({foto: _foto}).exec((err, photo)=>{
        if(photo === null){
            return next(new Error('No se ha encontrado la imagen '+_foto));
        }
        console.log(photo);

         res.render('images', { photo: _foto});
    });
   
});



module.exports = router;
>>>>>>> a600e9d3ca11d6713991965dfd711bdceb6ecb89
