/**
 * JWT configuration constants for token management
 * Defines secrets and expiration times for access and refresh tokens
 * Used for secure authentication and authorization
 */

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const ACCESS_EXPIRES_IN = '15m';
const REFRESH_EXPIRES_IN = '7d';

module.exports = {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    ACCESS_EXPIRES_IN,
    REFRESH_EXPIRES_IN
}
