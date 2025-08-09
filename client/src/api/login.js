import axios from "axios";
import {pageState} from "../utils/pageState.js";

export const login = async (emailParam, password, setErrorMsg, authCtx, pageCtx) => {
    try{
        const res = await axios.post(
            'http://localhost:3000/user/login',
            {
                emailParam,
                password,
            }
        )

        const{id, email, role} = res.data.user

        localStorage.setItem('auth', JSON.stringify({
            token: res.data.accessToken,
            id,
            email,
            role
        }))
        authCtx.setIsLogin(true);
        authCtx.setId(id);
        authCtx.setEmail(email);
        authCtx.setRole(role);
        pageCtx.dispatch({type:pageState.NONE});
        return true;
    }catch (e){
        console.log(e)
        console.log(e.response)
        console.log(e.response.data)

        setErrorMsg(e.response.data.message);
        return false
    }
}

export const logout = (email, password) => {
    return axios.post(
        'http://localhost:3000/user/login',
        {
            email,
            password,
        }
    )
}
