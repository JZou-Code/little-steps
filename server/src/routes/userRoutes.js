const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const {authenticate} = require('../middleware/userMiddleware')

router.post('/create-user', userController.createUser)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.post('/refresh-token', userController.refresh)


router.use(authenticate)
router.post('/profile', (req, res) => {
    res.json({ code: 200, data: { userId: req.user.sub, role: req.user.role } });
})
router.put('/update-user', userController.updateUser)
router.get('/find-user', userController.findUser)
router.get('/find-user-by-email', userController.findUserByEmail)
router.get('/find-many-users', userController.findManyUsers)
router.post('/find-many-users-by-offset', userController.findManyUsersByOffset)
router.delete('/delete-user/:id', userController.deleteUser)
router.put('/change-password', userController.login)

module.exports = router;
