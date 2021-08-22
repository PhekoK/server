var express = require('express');
var router = express.Router();
var Product = require('../models/productModel');

/* GET items listing. */
router.get('/', function(req, res, next) {
  Product.find((err, data) => {
    if(err) throw err;
    res.send(data);
  })
});

router.post('/', function (req, res, next) {
  Product.create(req.body, (err, data) => {
    if(err) throw err;
    res.send(data);
  })
});

module.exports = router;
