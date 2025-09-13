const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController')

router.post('/create-image', imageController.createImage)
router.put('/update-image', imageController.updateImage)
router.get('/find-image', imageController.findImage)
router.get('/find-many-images', imageController.findManyImages)
router.post('/find-many-images-by-offset', imageController.findManyImagesByOffset)
router.delete('/delete-image', imageController.deleteImage)

module.exports = router;
