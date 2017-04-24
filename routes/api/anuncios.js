'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//Obtenemos el Schema de anuncio
const Anuncio = mongoose.model('Anuncio');


//Vamos a obtener la lista de anuncios que tenemos hasta ahora
router.get('/', (req,res, next) =>{
    const nombre = req.query.nombre;
    const precio = req.query.precio;
    const venta = req.query.venta;
    const foto = req.query.foto;
    const tags = req.query.tags;
    console.log('Nombre:', nombre);
   const criterios = {};

   if(nombre) req.criterios = nombre; 
   if(precio) req.criterios = precio; 
   if(venta) req.criterios = venta; 
   if(foto) req.criterios = foto; 
   if(tags) req.criterios = tags; 

   Anuncio.list(criterios, (err, anuncios)=>{
       if(err){
           console.log('Error');
           next(err);
           return;
       }
       console.log('ok!!');
       res.json({success: true, result: anuncios});

   });
});

module.exports = router;