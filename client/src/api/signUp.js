import axios from "axios";
import {roles} from "../utils/roles.js";

/**
 * API functions for user registration and validation
 * Handles captcha requests, validation codes, and user signup
 */

/**
 * Requests a captcha image for verification
 * @returns {Promise} API response with captcha data
 */
export const requestCaptcha = () => {
    return axios.get(
        '/api/captcha'
    )
}

/**
 * Requests a validation code to be sent to email
 * @param {string} email - Email address to send validation code
 * @returns {Promise} API response for validation code request
 */
export const requestValidationCode = (email) => {
    return axios.post(
        '/api/send-validation-code',
        {
            email
        }
    )
}

/**
 * Creates a new user account
 * @param {Object} data - User registration data
 * @returns {Promise} API response for user creation
 */
export const requestSignUp = (data) => {
    const newData = {...data, role: roles.OTHER}

    return axios.post(
        '/api/user/create-user',
        newData
    )
}
