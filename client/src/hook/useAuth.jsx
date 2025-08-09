import React, {useContext} from 'react';
import axios from "axios";
import {pageState} from "../utils/pageState.js";
import PageStateContext from "../context/PageStateContext.jsx";
import AuthContext from "../context/AuthContext.jsx";
import {roles} from "../utils/roles.js";

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
            authCtx.setAuth({
                isLogin: true,
                user: {
                    id,
                    email,
                    role
                },
                token: res.data.data.accessToken
            })
            pageCtx.dispatch({type: pageState.NONE});
            return true;
        } catch (e) {
            setErrorMsg(e.response.data.message);
            return false
        }
    }

    const logout = async (id) => {
        try {
            const res = await axios.post(
                'http://localhost:3000/user/logout',
                {
                    id
                }
            )

            localStorage.removeItem('auth');

            authCtx.setAuth({
                isLogin: false,
                user: {
                    id: '',
                    email: '',
                    role: roles.PARENT
                },
                token: ''
            })

            pageCtx.dispatch({type: pageState.NONE});
            return true;
        } catch (e) {
            alert(e.response.data.message);
            return false
        }finally {
            authCtx.setAuth(prev=>{
                return {
                    ...prev,
                    isLogin: false
                }
            })
        }
    }

    return {
        login,
        logout
    }
};

export default useAuth;
