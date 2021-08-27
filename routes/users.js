var express = require('express');
var router = express.Router();

const createError = require('http-errors');
const mongoose = require('mongoose');

var User = require('../models/userModel');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find((err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

/** GET Users by Id http://localhost:3000/users/:id */
router.get('/:id', (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if(err) throw err;
    if(!data)
        return res.status(404).send('User Not found with given ID');
    res.send(data);
  });
});

/**POST Request to insert new data - for Registration User */
/* POST users listing. */
/**
 *    Url http://localhost:3000/users
 * {
    "firstNAme": "User 1",
    "lastName": "User 1",
    "email": "user1@user.com",
    "password": "mypassword",
    "confirmPassword": "mypassword",
    "dob": 12-02-1999,
    "phoneNumber": "0154789652"
}
 */
router.post('/', (req, res) => {
  User.create(req.body, (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

//PUT request to edit existing user
/**
 *    Url http://localhost:3000/users/:id
 * {
    "firstNAme": "User 1",
    "lastName": "User 1",
    "email": "user1@user.com",
    "password": "mypassword",
    "confirmPassword": "mypassword",
    "dob": 12-02-1999,
    "phoneNumber": "0154789652"
}
 */
router.put('/:id', (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if(err) throw err;
    if(!data) 
         return res.status(404).send("User does not exist with given ID");
     User.findByIdAndUpdate(req.params.id, req.body, function (err) {
         if (err) throw err;
          //res.send('User Updated Successfully');
         res.send(data);
        });
  });
});

/** Delete User by Id */

/* router.delete('/:id', async (req, res, next) => {
  try{
   const id = req.params.id;
   const result = await User.findByIdAndDelete(id, function (err) {
     if(err){
       return next(createError(400, "Invalid User ID"));
     }
   })
   if(!result) {
     return next(createError(404, "User Does not exist"));
   }
   res.send(result);
  } catch(error){
    console.log(error.message);
    if(error instanceof mongoose.CastError) {
      return next(createError(400, "Invalid User ID"));
    }
    next(error);
  }
}) */

router.delete('/:id', function(req, res, next) {
  try {
    User.findById(req.params.id, (err, user) => {
      if (err) {
        console.log(err.message);
      }
      if(!user) {
        return res.status(404).send("User does not exist with given ID");
      }
    })
    User.findByIdAndRemove({_id: req.params.id}).then(function(user){
      res.send(user);
    });

  } catch(error){
    console.log(error.message);
    if( error instanceof mongoose.CastError) {
      return next(createError(400, "Invalid User _id"));
    }
  }
  
});


module.exports = router;
