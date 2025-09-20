import axios from "axios";
import {roles} from "../utils/roles.js";

export const requestCaptcha = () => {
    return axios.get(
        '/api/captcha'
    )
}

export const requestValidationCode = (email) => {
    return axios.post(
        '/api/send-validation-code',
        {
            email
        }
    )
}

export const requestSignUp = (data) => {
    const newData = {...data, role: roles.OTHER}

    return axios.post(
        '/api/user/create-user',
        newData
    )
}
