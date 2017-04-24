'use strict';

const mongoClient = require('mongodb');
var assert = require('assert');
var url = 'mongodb://localhost:27017';
/*
usuario1 = {
    'nombre' : 'Paco',
    'email' : 'paco@email.com',
    'clave' : '1111'
};

usuario2 = {
    'nombre' : 'Pepe',
    'email' : 'pepe@email.com',
    'clave' :   '2222'
};

usuario3 = {
    'nombre' : 'Manolo',
    'email' :   'manolo@email.com',
    'clave' :   '3333'

};

console.log('usuarios cargados en la bd');
*/

const insertDocument = function(db, callback) {
   db.collection('anuncios').insert( [{
        'nombre': 'bolígrafo',
        'precio': 20 ,
        'venta': true,
        'foto': 'fotoBoligrafo.jpeg',
        'tags': ['escolar', 'oficina']
   },
   {
    'nombre': 'libro',
    'precio': 24 ,
    'venta': true,
    'foto': 'fotoLibro.jpeg',
    'tags': ['ocio', 'cultura']
    }

   ], function(err, result) {
    assert.equal(err, null);
    console.log("insertado anuncios.");
    callback();
  });
};

const deleteCollection = function(db, callback){
    db.collection('anuncios').deleteAll;
    callback();
};

mongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
 deleteCollection(db, function(){
     console.log("borrado");
 })
  insertDocument(db, function() {
      db.close();
  });
});