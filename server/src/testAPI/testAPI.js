const express = require('express');
const router = express.Router();

const userDao = require('../DAO/userDAO');
const ChildDao = require('../DAO/childDAO');

router.post('/addUser', async (req, res) => {
    const data = req.body;
    const result = await userDao.createUser(data);
    res.send(result)
})

router.get('/findUser', async (req, res) => {
    const id = req.query.id;
    const result = await userDao.findUser(id);
    res.send(result)
})

router.get('/findManyUser', async (req, res) => {
    const result = await userDao.findManyUsers(req.query);
    res.send(result)
})

router.put('/updateUser', async (req, res) => {
    const {id, ...rest} = req.body;
    const result = await userDao.updateUser(id, rest)
    res.send(result)
})

router.delete('/deleteUser', async (req, res) => {
    const {id} = req.query;
    const result = await userDao.deleteUser(id)
    res.send(result)
})

module.exports = router;

