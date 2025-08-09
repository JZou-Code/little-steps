import {useContext} from 'react';
import axios from "axios";
import {pageState} from "../utils/pageState.js";
import PageStateContext from "../context/PageStateContext.jsx";
import AuthContext from "../context/AuthContext.jsx";
import {roles} from "../utils/roles.js";
import axiosApi from "../api/axiosApi.js";

const useAuth = () => {
    const authCtx = useContext(AuthContext);
    const pageCtx = useContext(PageStateContext);

    const login = async (emailParam, password, setErrorMsg) => {
        try {
            const res = await axios.post(
                '/api/user/login',
                {
                    email: emailParam,
                    password,
                }
            )

            const {id, email, role} = res.data.data.user

            const auth = {
                token: res.data.data.accessToken,
                user: {
                    id,
                    email,
                    role
                },
                isLogin: true
            }

            localStorage.setItem('auth', JSON.stringify(auth));
            authCtx.setAuth(auth);
            pageCtx.dispatch({type: pageState.NONE});
            return true;
        } catch (e) {
            console.log(e)
            setErrorMsg(e.response.data.message);
            return false
        }
    }

    const logout = async (id) => {
        try {
            const res = await axios.post(
                '/api/user/logout',
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
        } finally {
            authCtx.setAuth(prev => {
                return {
                    ...prev,
                    isLogin: false
                }
            })
        }
    }

    const refreshToken = async () => {
        try {
            const res = await axios.post(
                '/api/user/refresh-token',
                {}
            )

            console.log(res)

            const newAT = res.data?.data?.accessToken || res.data?.accessToken;

            console.log(newAT)

            const old = JSON.parse(localStorage.getItem('auth') || '{}');

            console.log(old)

            const next = {...old, token: newAT};
            localStorage.setItem('auth', JSON.stringify(next));

            authCtx.setAuth(prev => ({...prev, token: newAT}));
            return newAT;
        } catch (e) {
            localStorage.removeItem('auth');
            authCtx.setAuth({
                isLogin: false,
                user: {id: '', email: '', role: roles.PARENT},
                token: ''
            });
            pageCtx.dispatch({type: pageState.NONE});
            alert(e?.response?.data?.message || 'Refresh failed');
            return false;
        }
    }

    return {
        login,
        logout,
        refreshToken
    }
};

export default useAuth;
