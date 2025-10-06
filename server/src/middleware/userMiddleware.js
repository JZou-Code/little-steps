const jwt = require('jsonwebtoken');
const { JWT_ACCESS_SECRET } = process.env;

/**
 * Authentication middleware that verifies JWT tokens
 * Checks for Bearer token in Authorization header
 * Validates token and adds user information to request object
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const authenticate = (req, res, next) => {
    const hdr = req.headers.authorization || '';

    if (!hdr.startsWith('Bearer ')) {
        return res.status(401).json({ code: 401, message: 'Missing token' });
    }
    const token = hdr.slice(7);

    try {
        req.user = jwt.verify(token, JWT_ACCESS_SECRET);
        next();
    } catch (e) {
        console.log(e)
        return res.status(401).json({ code: 401, message: 'Invalid or expired token' });
    }
}

module.exports = {
    authenticate
}
