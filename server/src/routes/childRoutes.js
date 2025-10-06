/**
 * Child routes configuration for handling child-related API endpoints
 * Defines CRUD operations for child entities
 * All routes require authentication middleware
 */

const express = require('express');
const router = express.Router();
const childController = require('../controllers/childController')

router.post('/create-child', childController.createChild)
router.put('/update-child', childController.updateChild)
router.get('/find-child', childController.findChild)
router.get('/find-many-children', childController.findManyChildren)
router.post('/find-many-children-by-offset', childController.findManyChildrenByOffset)
router.delete('/delete-child', childController.deleteChild)

module.exports = router;
