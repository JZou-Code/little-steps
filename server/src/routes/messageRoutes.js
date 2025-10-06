/**
 * Message routes configuration for handling message-related API endpoints
 * Defines operations for creating and retrieving messages
 * All routes require authentication middleware
 */

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController')

router.post('/create-message', messageController.createMessage)
router.get('/find-many-messages', messageController.findManyMessages)
router.post('/find-many-messages-by-offset', messageController.findManyMessagesByOffset)


module.exports = router;
