'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
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

//Vamos a obtener la lista de anuncios que tenemos hasta ahora
router.get('/', (req,res, next) =>{
    const nombre = req.query.nombre;
    const precio = req.query.precio;
    const venta = req.query.venta;
    const foto = req.query.foto;
    const tag = req.query.tag;
    const limit = +req.query.limit;
    const skip = +req.query.skip;
    const select = req.query.select;
    const sort = req.query.sort;

    const criterios = {};
    const nombreFiltrado = new RegExp(nombre, 'i');
    if(nombre) criterios.nombre = nombreFiltrado;
    if(venta) criterios.venta = venta; 
    if(foto) criterios.foto = foto; 
    if(tag) criterios.tags = tag; 
    if(precio) criterios.precio = filtraPrecio(precio);

    
    Anuncio.list(criterios,tag, limit, skip, select, sort,(err, anuncios)=>{
        if(err){
            return next(err);
        }
        res.json({success: true, result: anuncios});
    });
});


module.exports = router;
