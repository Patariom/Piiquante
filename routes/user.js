//Requires
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

//Routes for the users
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);


////Export the router
module.exports = router;