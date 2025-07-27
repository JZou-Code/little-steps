const userDao = require('../DAO/userDAO');
const saltTool = require('../utils/SaltTool');

const createUser = async (data) => {
    data.password = await saltTool.hash(data.password);
    return userDao.createUser(data)
}

const updateUser = async (id, data) => {
    return userDao.updateUser(id, data);
}

const findUser = (id) => {
    return userDao.findUser(id);
}

const findUserByEmail = (email) => {
    return userDao.findUserByEmail(email);
}

const findManyUsers = (filterObj) => {
    return userDao.findManyUsers(filterObj);
}

const deleteUser = (id) => {
    return userDao.deleteUser(id);
}

const changePassword = async (id, newPwd) => {
    const storedData = await userDao.findUser(id);
    const hashedPwd = storedData.password;
    const result = await saltTool.verify(hashedPwd, newPwd)
    if (result) {
        return {
            flag: false,
            message: 'Password cannot be the same as the current one.'
        }
    }
    const newHashedPwd = await saltTool.hash(newPwd);
    const newData = await userDao.updateUser(id, {password: newHashedPwd})
    return {
        flag: true,
        data: newData,
        message: 'Password changed successfully.'
    }
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