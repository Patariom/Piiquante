//Requires
const express = require('express');
const router = express.Router();

//Import middleware to check if password is difficult enough
const checkPassword = require('../middlewares/password');

const userCtrl = require('../controllers/user');


//Routes for the users
router.post('/signup', checkPassword, userCtrl.signup);
router.post('/login', userCtrl.login);


////Export the router
module.exports = router;