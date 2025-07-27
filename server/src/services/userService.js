const userDao = require('../DAO/userDAO');

const createUser = (data) => {
    return userDao.createUser(data)
}

module.exports = {
    createUser
}