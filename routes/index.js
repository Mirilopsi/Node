var express = require('express');
var router = express.Router();
<<<<<<< HEAD
const mongoose = require('mongoose');

require('localize');
const traduccion = require('../lib/customError');

/* GET home page. */
router.get('/', function(req, res, next) {
  
=======

/* GET home page. */
router.get('/', function(req, res, next) {
>>>>>>> a600e9d3ca11d6713991965dfd711bdceb6ecb89
  res.render('index', { title: 'nodepop' });
});

router.get('/login', function(req, res,next){
  res.render('login');
});

router.get('/registro', function(req, res,next){
  res.render('registro');
});

<<<<<<< HEAD

=======
>>>>>>> a600e9d3ca11d6713991965dfd711bdceb6ecb89
module.exports = router;
