var express = require('express');
var router = express.Router();
var Product = require('../models/productModel');

/* GET items listing. */
//Request URL http:localhost:3000/products
router.get('/', function(req, res, next) {
  Product.find((err, data) => {
    if(err) throw err;
    res.send(data);
  })
});

//Request URL by Id: http:localhost:3000/products/:id
router.get('/:id', (req, res) => {
  Product.findById(req.params.id, (err, data) => {
    if(err) throw err;
    if(!data)
        return res.status(404).send('Product Not found with given ID');
    res.send(data);
  })
});

//Request URL http://localhost:3000/products
// Header : Content Type: application/json
//Request Body: {"name":"Face Cloth","price":10,"availability":"In Stock","quantity":40,"image":"https://i2.wp.com/www.yebofresh.co.za/wp-content/uploads/2021/05/image-63.jpeg?fit=300%2C300&ssl=1&is-pending-load=1","brand":"No Name","size":"1s","category":"Toiletries , Household","SKU":"NRU12780","date_added":"2021-08-22T22:31:34.792Z","__v":0}
/**
 *  {
   "name":"Toilet Paper",
   "price":120,
   "availability":"In Stock",
   "quantity":40,
   "image":"https://norwoodhome.co.za/wp-content/uploads/2020/10/1-ply-toilet-paper-1-768x768.jpg",
   "brand":"Twinsaver",
   "size":"48 rolls",
   "category":"Toiletries , Household",
   "SKU":"NRU12110"
 }
 */

router.post('/', (req, res) => {
  Product.create(req.body, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

module.exports = router;
