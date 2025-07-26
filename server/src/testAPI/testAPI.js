const express = require('express');
const router = express.Router();

const userDao = require('../DAO/userDAO');
const childDao = require('../DAO/childDAO');

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

router.post('/addChild', async (req, res) => {
    const data = req.body;
    const result = await childDao.createChild(data);
    res.send(result)
})

router.get('/findChild', async (req, res) => {
    const id = req.query.id;
    const result = await childDao.findChild(id);
    res.send(result)
})

router.get('/findManyChildren', async (req, res) => {
    const result = await childDao.findManyChildren(req.query);
    res.send(result)
})

router.put('/updateChild', async (req, res) => {
    const {id, ...rest} = req.body;
    const result = await childDao.updateChild(id, rest)
    res.send(result)
})

router.delete('/deleteChild', async (req, res) => {
    const {id} = req.query;
    const result = await childDao.deleteChild(id)
    res.send(result)
})

module.exports = router;

