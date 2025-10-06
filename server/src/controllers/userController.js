const userService = require('../services/userService');

/**
 * User controller that handles HTTP requests for user operations
 * Manages user creation, authentication, profile updates, and account management
 */

/**
 * Creates a new user account
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const createUser = async (req, res) => {
    const data = req.body;
    const result = await userService.createUser(data)
    console.log(result)
    res.send(result)
}

/**
 * Handles user login authentication
 * Sets refresh token cookie and returns access token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
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

/**
 * Handles user logout
 * Clears refresh token cookie and destroys session
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const logout = async (req, res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict'
    });

    req.session.destroy(err => {
        if (err) {
            console.error('Session destroy error:', err);
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
}

/**
 * Refreshes access token using refresh token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const refresh = (req, res) => {
    try {
        const rt = req.cookies.refreshToken;
        if (!rt) return res.status(401).json({ message: 'No refresh token' });

        const result = userService.refresh(rt);
        if (result.code === 200) {
            return res.status(200).json(result);
        }
        return res.status(403).json(result);
    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Server error' });
    }
}

const updateUser = async (req, res) => {
    const {id, ...data} = req.body;
    console.log(data)
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

const findManyUsersByOffset = async (req, res) => {
    const filter = req.body;
    const result = await userService.findManyUsersByOffset(filter)
    res.send(result)
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    const result = await userService.deleteUser(id)
    res.send(result)
}

const changePassword = async (req, res) => {
    const {id, currentPwd, newPwd} = req.body;
    const result = await userService.changePassword(id, currentPwd, newPwd)
    res.send(result)
}

module.exports = {
    createUser,
    login,
    logout,
    refresh,
    updateUser,
    findUser,
    findManyUsers,
    findManyUsersByOffset,
    deleteUser,
    changePassword,
    findUserByEmail
}
