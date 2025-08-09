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
    const newData = {...data, role:'PARENT'}

    return axios.post(
        'http://localhost:3000/user/create-user',
        newData
    )
}
