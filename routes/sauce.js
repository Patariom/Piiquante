const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const multer = require('../middlewares/multer-config');

const saucesCtrl = require('../controllers/sauce');

router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);

module.exports = router;