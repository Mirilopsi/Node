'use strict';
const crypto = require('crypto');
<<<<<<< HEAD
const config = require('../config/cipher_config');

module.exports = {
    cifrar: function cifrarClave(clave){
        const cifrar = crypto.createCipher(config.algoritmo, config.pass);
        let encriptado = cifrar.update(clave,'utf8','hex');
=======
const config = require('../config/cipher_config')
module.exports = {
    cifrar: function cifrarClave(clave){
        const cifrar = crypto.createCipher(config.algoritmo, config.pass);
        let encriptado = cifrar.update(clave,'utf8','hex')
>>>>>>> a600e9d3ca11d6713991965dfd711bdceb6ecb89

        encriptado += cifrar.final('hex');

        return encriptado;  
<<<<<<< HEAD
    }
=======
    },

    descifrar: function descifrarClave(claveCifrada){
        const descifrar = crypto.createDecipher(config.algoritmo, config.pass);
        let clave = descifrar.update(claveCifrada,'hex','utf8')

        clave += descifrar.final('utf8');

        return clave;  
    }

>>>>>>> a600e9d3ca11d6713991965dfd711bdceb6ecb89
}