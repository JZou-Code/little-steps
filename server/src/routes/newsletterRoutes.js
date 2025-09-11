const express = require('express');
const router = express.Router();
const newsletterController = require('../controllers/newsletterController')

router.post('/create-newsletter', newsletterController.createNewsletter)
router.put('/update-newsletter', newsletterController.updateNewsletter)
router.get('/find-newsletter', newsletterController.findNewsletter)
router.get('/find-many-newsletters', newsletterController.findManyNewsletters)
router.post('/find-many-newsletters-by-offset', newsletterController.findManyNewslettersByOffset)
router.delete('/delete-newsletter', newsletterController.deleteNewsletter)

module.exports = router;
