const userService = require('../services/userService');

const createUser = async (req, res) => {
    const data = req.body;
    const result = await userService.createUser(data)
    console.log(result)
    res.send(result)
}

const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const result = await userService.login(email, password);

        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 7 * 24 * 3600 * 1000
        });

        return res.status(200).json({
            code: 200,
            message: 'ok',
            data: {
                accessToken: result.accessToken,
                user: result.user,
            },
        });
    }catch (e){
        return next(e)
    }
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
    login,
    updateUser,
    findUser,
    findManyUsers,
    deleteUser,
    changePassword,
    findUserByEmail
}
