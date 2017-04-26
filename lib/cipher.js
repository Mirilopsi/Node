'use strict';
const crypto = require('crypto');
const config = require('../config/cipher_config')
module.exports = {
    cifrar: function cifrarClave(clave){
        const cifrar = crypto.createCipher(config.algoritmo, config.pass);
        let encriptado = cifrar.update(clave,'utf8','hex')

        encriptado += cifrar.final('hex');

        return encriptado;  
    },

    descifrar: function descifrarClave(claveCifrada){
        const descifrar = crypto.createDecipher(config.algoritmo, config.pass);
        let clave = descifrar.update(claveCifrada,'hex','utf8')

        clave += descifrar.final('utf8');

        return clave;  
    }

}