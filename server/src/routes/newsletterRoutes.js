const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController')

const multer = require('multer');
const path = require("path");
const upload = multer({
    dest: path.join(__dirname, '../../public/images/temp'),
})

router.post('/create-newsletter', upload.array('files[]', 9), newsletterController.createNewsletter)
router.put('/update-newsletter', newsletterController.updateNewsletter)
router.get('/find-newsletter', newsletterController.findNewsletter)
router.get('/find-many-newsletters', newsletterController.findManyNewsletters)
router.post('/find-many-newsletters-by-offset', newsletterController.findManyNewslettersByOffset)
router.delete('/delete-newsletter', newsletterController.deleteNewsletter)

module.exports = router;
