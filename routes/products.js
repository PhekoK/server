var express = require('express');
var router = express.Router();
var Product = require('../models/productModel');
const createError = require('http-errors');
const  mongoose  = require('mongoose');

/* GET items listing. */
//Request URL http:localhost:3000/products
router.get('/', function(req, res, next) {
  Product.find((err, data) => {
    if(err) throw err;
    res.send(data);
  })
});

//Request URL by Id: http:localhost:3000/products/:id
router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id, (err, data) => {
    if(err) 
         console.log(err);
         if (err instanceof mongoose.CastError){
           next(createError(400, "Invalid Product ID"))
           return;
         }
    if(!data)
        return res.status(404).send('Product Not found with given ID');
          //throw createError(404, 'Product with given ID does not exist');  
        res.send(data);
  });
});

// PUT request to edit 
router.put('/:id', (req, res) => {
  Product.findById(req.params.id, (err, data) => {
    if (err) 
        console.log(err.message);
    if(!data)
        return res.status(404).send("Product with given ID does not exist!!");
    Product.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
      if (err) throw err;
      res.send(data);
    });
  });
});

// PUT request to edit 
router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const updates = req.body;
    const options = { new: true };

    const result = await Product.findByIdAndUpdate(id, updates, options); 
    if(!result) {
      throw createError(404, "Product does not exist");
    }
    res.send(result);
  } catch(error) {
    console.log(error.message);
    if (error instanceof mongoose.CastError){
      return next(createError(400, "Invalid Product ID"))
    }
    next(error)
  }
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

//Handle DELETE request
router.delete('/:id', function(req, res, next) {
  try {
    Product.findById(req.params.id, (err, data) => {
      if (err) {
        console.log(err.message);
      }
      if(!data) {
        return res.status(404).send("Product does not exist with given ID");
      }
    })
    Product.findByIdAndRemove({_id: req.params.id}).then(function(data){
      res.send(data);
    });

  } catch(error){
    console.log(error.message);
    if( error instanceof mongoose.CastError) {
      return next(createError(400, "Invalid Product _id"));
    }
  }
  
});



module.exports = router;
