import axios from "axios";

export const login = (username,password,email) => {
    axios.post(
        'http://13.222.232.220:8080/swagger-ui/index.html#/auth-controller/getCaptcha',
        {
            username,
            password,
            email
        }
    )
}