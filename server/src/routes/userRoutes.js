const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/create-user', userController.createUser)
router.post('/login', userController.login)
router.put('/update-user', userController.updateUser)
router.get('/find-user', userController.findUser)
router.get('/find-user-by-email', userController.findUserByEmail)
router.get('/find-many-user', userController.findManyUsers)
router.delete('/delete-user', userController.deleteUser)
router.put('/change-password', userController.login)

module.exports = router;
