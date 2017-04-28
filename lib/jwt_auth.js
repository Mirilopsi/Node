'use strict';
const jwt = require('jsonwebtoken');
const config  = require('../config/jwt_config');

module.exports = function(req,res, next){    
<<<<<<< HEAD

    const token = req.body.token || req.query.token || req.get('x-access-token');
=======
    res.render('login', { title: 'nodepop' });

    const token = req.body.token || req.query.token || req.get('token-acceso');
>>>>>>> a600e9d3ca11d6713991965dfd711bdceb6ecb89

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
<<<<<<< HEAD
        return next();
=======
        next();
>>>>>>> a600e9d3ca11d6713991965dfd711bdceb6ecb89
    });
};