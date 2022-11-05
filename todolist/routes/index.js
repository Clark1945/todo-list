var express = require('express');
var test= require('../modules/test')
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  // debug("Listening");
  res.render('index', { title: 'Express'+ test.add(5,6)+test.multi(5,6) });
});


module.exports = router;
