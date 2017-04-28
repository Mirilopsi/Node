var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

require('localize');
const traduccion = require('../lib/customError');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'nodepop' });
});

router.get('/login', function(req, res,next){
  res.render('login');
});

router.get('/registro', function(req, res,next){
  res.render('registro');
});


module.exports = router;
