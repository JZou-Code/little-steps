const argon2 = require('argon2');

/**
 * SaltTool class that handles password hashing and verification
 * Uses Argon2id algorithm for secure password hashing
 * Provides methods for hashing passwords and verifying against stored hashes
 */
class SaltTool{
    constructor() {
        this.options = {
            type: argon2.argon2id,
            // 16 MiB
            memoryCost: 2 ** 14,
            timeCost:   3,
            parallelism: 1,
        };
    }

    /**
     * Hashes a password using Argon2id algorithm
     * @param {string} password - Plain text password to hash
     * @returns {Promise<string>} Hashed password
     */
    async hash(password){
        return argon2.hash(password, this.options);
    }

    /**
     * Verifies a plain password against a stored hash
     * @param {string} hashPwd - Stored password hash
     * @param {string} plainPwd - Plain text password to verify
     * @returns {Promise<boolean>} True if password matches, false otherwise
     */
    async verify(hashPwd, plainPwd){
        return argon2.verify(hashPwd, plainPwd);
    }
}

module.exports = new SaltTool();