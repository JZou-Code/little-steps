const userDao = require('../DAO/userDAO');
const saltTool = require('../utils/SaltTool');
const jwt = require('jsonwebtoken');
const {JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, ACCESS_EXPIRES_IN, REFRESH_EXPIRES_IN} = require('../auth/config');

const createUser = async (data) => {
    data.password = await saltTool.hash(data.password);
    return userDao.createUser(data)
}

const login = async (email, password) => {
    const storedData = await userDao.findUserByEmail(email);
    if (!storedData) {
        const err = new Error('Invalid credentials.');
        err.status = 401;
        throw err;
    }

    const hashedPwd = storedData.password;
    const result = await saltTool.verify(hashedPwd, password)
    if (!result) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        throw err;
    }

    const accessToken = jwt.sign(
        {sub: storedData.id, role: storedData.role, email: storedData.email},
        JWT_ACCESS_SECRET,
        {expiresIn: ACCESS_EXPIRES_IN}
    );

    const refreshToken = jwt.sign(
        {sub: storedData.id},
        JWT_REFRESH_SECRET,
        {expiresIn: REFRESH_EXPIRES_IN}
    );

    return {
        accessToken,
        refreshToken,
        user: {id: storedData.id, email: storedData.email, role: storedData.role}
    }
}

const refresh = (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
        const newAccessToken = jwt.sign(
            { sub: decoded.sub, role: decoded.role },
            JWT_ACCESS_SECRET,
            { expiresIn: ACCESS_EXPIRES_IN }
        );
        return { code: 200, message: 'ok', data: { accessToken: newAccessToken } };
    } catch (e) {
        return { code: 403, message: 'Invalid refresh token', data: {} };
    }
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
            code: '409',
            data: null,
            message: 'Password cannot be the same as the current one.'
        }
    }
    const newHashedPwd = await saltTool.hash(newPwd);
    const newData = await userDao.updateUser(id, {password: newHashedPwd})
    return {
        code: '200',
        data: newData,
        message: 'Password changed successfully.'
    }
}

module.exports = {
    createUser,
    login,
    refresh,
    updateUser,
    findUser,
    findManyUsers,
    deleteUser,
    changePassword,
    findUserByEmail
}
