const userService = require('../services/userService');

const createUser = async (req, res) => {
    const data = req.body;
    const result = await userService.createUser(data)
    res.send(result)
}

const updateUser = async (req, res) => {
    const {id, ...data} = req.body;
    const result = await userService.updateUser(id, data)
    res.send(result)
}

const findUser = async (req, res) => {
    const {id} = req.query;
    const result = await userService.findUser(id)
    res.send(result)
}

const findUserByEmail = async (req, res) => {
    const {email} = req.query;
    const result = await userService.findUserByEmail(email)
    if (result) {
        res.send({
            flag: true,
            message: 'This email address is already registered.'
        })
        return
    }
    res.send({
        flag: false,
        message: 'This email address is available.'
    })
}

const findManyUsers = async (req, res) => {
    const filter = {...req.query};
    const result = await userService.findManyUsers(filter)
    res.send(result)
}

const deleteUser = async (req, res) => {
    const {id} = req.query;
    const result = await userService.deleteUser(id)
    res.send(result)
}

const changePassword = async (req, res) => {
    const {id, password} = req.body;
    const result = await userService.changePassword(id, password)
    res.send(result)
}

module.exports = {
    createUser,
    updateUser,
    findUser,
    findManyUsers,
    deleteUser,
    changePassword,
    findUserByEmail
}