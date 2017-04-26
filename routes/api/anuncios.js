'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//Obtenemos el Schema de anuncio
const Anuncio = mongoose.model('Anuncio');
const jwtAuth = require('../../lib/jwt_auth');

//router.use(jwtAuth);

//Vamos a obtener la lista de anuncios que tenemos hasta ahora
router.get('/', (req,res, next) =>{
    const nombre = req.query.nombre;
    const precio = req.query.precio;
    const venta = req.query.venta;
    const foto = req.query.foto;
    const tags = req.query.tags;
    const limit = +req.query.limit;
    const skip = +req.query.skip;
    const select = req.query.select;
    const sort = req.query.sort;

    console.log(limit);
    const criterios = {};
    if(nombre) req.criterios = nombre; 
    if(precio) req.criterios = precio; 
    if(venta) req.criterios = venta; 
    if(foto) req.criterios = foto; 
    if(tags) req.criterios = tags; 

    Anuncio.list(criterios, limit, skip, select, sort,(err, anuncios)=>{
        if(err){
            return next(err);
        }
        res.json({success: true, result: anuncios});

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