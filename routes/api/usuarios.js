'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');

const jwt = require('jsonwebtoken');
const config = require('../../config/jwt_config');

const encriptar = require('../../lib/cipher');

//Vamos a obtener la lista de anuncios que tenemos hasta ahora
router.post('/login', (req, res, next) =>{
    const email = req.body.email;
    const clave = req.body.clave;

    Usuario.findOne({email:email}).exec((err, encontrado)=>{
        if(err){
            console.log('error!!!!');
            return next(err);
        }
        console.log(encontrado);
        if(!encontrado){
            res.json({success: false, err: 'E-mail incorrecto'});
            return;    
        }
        if (clave !== encontrado.clave){
            res.json({success: false, err: 'contraseña incorrecta'});
            return;  
            
        }
        jwt.sign({ usuario_id: encontrado._id }, config.jwtSecret, config.jwtConfig,(err,token)=>{
            if(err){
                next(err);
                return;
            }
            res.json({succes: true, token: token});
        });

   });
});

router.post('/registro', (req, res, next) =>{
    const datosUsuario = req.body;
  
    Usuario.findOne({email:datosUsuario.email}).exec((err,encontrado)=>{
        if(err){
            console.log('error al registrar');
            return next(err);
        }
        if(encontrado){
            res.json({success: false, err: 'Este usuario ya está registrado'});
            return;
        }

        const pruebaClave= encriptar.cifrar(datosUsuario.clave);
        const pruebaClave2= encriptar.descifrar(pruebaClave);
        console.log({encriptada: pruebaClave, desencriptada: pruebaClave2 });
        const nuevoUsuario = new Usuario(datosUsuario);

        nuevoUsuario.save((err,guardado) =>{
            if(err){
                console.log("Error al guardar el usuario");
                return next(err);
            }
            console.log('Usuario '+guardado.nombre+' guardado correctamente')
            res.json({success:true, result: guardado});
        });
    });
});

module.exports = router;