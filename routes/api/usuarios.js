'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//Obtenemos el Schema de anuncio
const Usuario = mongoose.model('Usuario');


//Vamos a obtener la lista de anuncios que tenemos hasta ahora
router.get('/', (req,res, next) =>{
    const nombre = req.query.nombre;
    const email = req.query.email;
    const clave = req.query.clave;
    
    const criterios = {};

   if(nombre) req.criterios = nombre; 
   if(email) req.criterios = email; 
   if(clave) req.criterios = clave; 
  

   Usuario.list(criterios, (err, usuarios)=>{
       if(err){
           console.log('Error');
           next(err);
           return;
       }
       console.log('ok!!');
       res.json({success: true, result: usuarios});

   });
});



module.exports = router;