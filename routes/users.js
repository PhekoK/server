var express = require('express');
var router = express.Router();

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
/* router.delete('/:id', (req, res) => {
  User.findById(req.params.id, (err, data) => {
      if (err) throw err;
      if (!data)
           return res.status(404).send("User doesn't exist with given Id");
      User.findByIdAndDelete(req.params.id, (err, data) => {
          if (err) throw err;
          res.send(data);
      });
  });
}); */
router.delete('/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id, function (err) {
    if (err)
        throw err;
    res.send('User Deleted Successfully...')
  })
})


module.exports = router;
