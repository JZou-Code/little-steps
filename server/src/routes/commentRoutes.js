/**
 * Comment routes configuration for handling comment-related API endpoints
 * Defines CRUD operations for comments
 * All routes require authentication middleware
 */

const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController')

router.post('/create-comment', commentController.createComment)
router.get('/find-comment', commentController.findComment)
router.get('/find-many-comments', commentController.findManyComments)
router.post('/find-many-comments-by-offset', commentController.findManyCommentsByOffset)
router.delete('/delete-comment', commentController.deleteComment)

module.exports = router;
