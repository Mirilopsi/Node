'use strict';
const jwt = require('jsonwebtoken');
const config  = require('../config/jwt_config');

module.exports = function(req,res, next){    
    res.render('login', { title: 'nodepop' });

    const token = req.body.token || req.query.token || req.get('token-acceso');

    if(!token){
        const err = new Error('No se ha encontrado el token');
        return next(err);
    }

    jwt.verify(token, config.jwtSecret,(err, tokenDecod)=>{
        if(err){
            const err = new Error('Token no valido');
            return next(err);
        }
        req.usuario_id = tokenDecod.usuario_id;
        next();
    });
};