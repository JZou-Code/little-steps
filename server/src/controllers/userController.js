const userService = require('../services/userService');

const createUser = async (req, res) => {
    const data = req.body;
    const result = await userService.createUser(data)
    res.send(result)
}

module.exports = {
    createUser
}