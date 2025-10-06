/**
 * Top-level router that combines all API routes
 * Applies authentication middleware to protected routes
 * Organizes routes by feature (user, child, message, newsletter, comment)
 */

const express = require('express');
const router = express.Router();
const {authenticate} = require('../middleware/userMiddleware')

const userRouter = require('./userRoutes');
const childRouter = require('./childRoutes');
const messageRouter = require('./messageRoutes');
const newsletterRouter = require('./newsletterRoutes');
const commentRouter = require('./commentRoutes');

router.use('/user', userRouter);
router.use(authenticate)

router.use('/child', childRouter);
router.use('/message', messageRouter);
router.use('/newsletter', newsletterRouter);
router.use('/comment', commentRouter);

module.exports = router;
