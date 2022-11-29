const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const multer = require('../middlewares/multer-config');

const saucesCtrl = require('../controllers/sauce');
const { route } = require('./user');

router.post('/', auth, multer, saucesCtrl.createSauce);
router.post('/:id/like', auth, saucesCtrl.likeDislikeSauce);
router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);



module.exports = router;