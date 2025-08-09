import React, {useContext} from 'react';
import axios from "axios";
import {pageState} from "../utils/pageState.js";
import PageStateContext from "../context/PageStateContext.jsx";
import AuthContext from "../context/AuthContext.jsx";

const useAuth = () => {
    const authCtx = useContext(AuthContext);
    const pageCtx = useContext(PageStateContext);

    const login = async (emailParam, password, setErrorMsg) => {
        try {
            const res = await axios.post(
                'http://localhost:3000/user/login',
                {
                    email: emailParam,
                    password,
                }
            )

            const {id, email, role} = res.data.data.user

            localStorage.setItem('auth', JSON.stringify({
                token: res.data.data.accessToken,
                id,
                email,
                role
            }))
            authCtx.setIsLogin(true);
            authCtx.setId(id);
            authCtx.setEmail(email);
            authCtx.setRole(role);
            pageCtx.dispatch({type: pageState.NONE});
            return true;
        } catch (e) {
            console.log(e)
            console.log(e.response)
            console.log(e.response.data)

            setErrorMsg(e.response.data.message);
            return false
        }
    }

    const logout = async () => {}

    return {
        login,
        logout
    }
};

export default useAuth;
