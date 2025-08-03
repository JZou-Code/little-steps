export const regexObj = {
    USERNAME: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,12}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/,
    EMAIL: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
    PHONE: /^(?:\+64|0064|0)[2-9][0-9]{7,9}$/,
    VALIDATION_CODE: /^\d{6}$/,
    CAPTCHA_ID: /^.{5}$/
}

export function isValidUsername(name) {
    return regexObj.USERNAME.test(name);
}

export function isValidPassword(password) {
    return regexObj.PASSWORD.test(password);
}

export function isValidEmail(email) {
    return regexObj.EMAIL.test(email);
}

export function isValidPhone(phone) {
    return regexObj.PHONE.test(phone);
}

export function isValidCode(code) {
    return regexObj.VALIDATION_CODE.test(code);
}

export function isValidCaptchaId(id) {
    return regexObj.CAPTCHA_ID.test(id);
}