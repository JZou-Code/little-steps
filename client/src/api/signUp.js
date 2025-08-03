import axios from "axios";

export const requestCaptcha = () => {
    return axios.get(
        'api/captcha'
    )
}

export const requestValidationCode = (email)=>{
    return axios.post(
        'api/send-validation-code',
        {
            email
        }
    )
}

export const requestSignUp = (data)=>{
    return axios.post(
        'api/user/register',
        data
    )
}