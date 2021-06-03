const express = require("express");
const router = express.Router();
const sauce = require('../controllers/sauce');


const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// All routes for sauces
router.post('/', auth, multer, sauce.createSauce);
router.get('/', auth, sauce.getAllSauces);
router.get('/:id', auth, sauce.getOneSauce);
router.put('/:id', auth, multer, sauce.update)

router.delete('/:id', auth, sauce.delete);
router.post('/:id/like', auth, sauce.likeSauce);

module.exports = router;
