/**
 * Regular expression patterns for input validation
 * Contains patterns for username, password, email, phone, validation code, and captcha
 */
export const regexObj = {
    USERNAME: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,12}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
    EMAIL: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    PHONE: /^(?:\+64|0064|0)[2-9][0-9]{7,9}$/,
    VALIDATION_CODE: /^\d{6}$/,
    CAPTCHA_ID: /^.{5}$/
}

/**
 * Validates username format according to defined regex pattern
 * @param {string} name - Username to validate
 * @returns {boolean} True if username is valid
 */
export function isValidUsername(name) {
    return regexObj.USERNAME.test(name);
}

/**
 * Validates password format according to defined regex pattern
 * @param {string} password - Password to validate
 * @returns {boolean} True if password is valid
 */
export function isValidPassword(password) {
    return regexObj.PASSWORD.test(password);
}

/**
 * Validates email format according to defined regex pattern
 * @param {string} email - Email address to validate
 * @returns {boolean} True if email is valid
 */
export function isValidEmail(email) {
    return regexObj.EMAIL.test(email);
}

/**
 * Validates phone number format according to defined regex pattern
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if phone number is valid
 */
export function isValidPhone(phone) {
    return regexObj.PHONE.test(phone);
}

/**
 * Validates validation code format according to defined regex pattern
 * @param {string} code - Validation code to validate
 * @returns {boolean} True if validation code is valid
 */
export function isValidCode(code) {
    return regexObj.VALIDATION_CODE.test(code);
}

/**
 * Validates captcha ID format according to defined regex pattern
 * @param {string} id - Captcha ID to validate
 * @returns {boolean} True if captcha ID is valid
 */
export function isValidCaptchaId(id) {
    return regexObj.CAPTCHA_ID.test(id);
}