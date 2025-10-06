import {useContext} from 'react';
import axios from "axios";
import {pageState} from "../utils/pageState.js";
import PageStateContext from "../context/PageStateContext.jsx";
import AuthContext from "../context/AuthContext.jsx";
import {roles} from "../utils/roles.js";
import {requestLogout, requestRefresh} from "../api/manageUsers.js";
// import axiosApi from "../api/axiosApi.js";

/**
 * Custom hook for authentication operations
 * Provides login, logout, and token refresh functionality
 * Manages authentication state and localStorage persistence
 * 
 * @returns {Object} Authentication methods and state
 * @returns {Function} returns.login - Login function
 * @returns {Function} returns.logout - Logout function  
 * @returns {Function} returns.refreshToken - Token refresh function
 */
const useAuth = () => {
    const authCtx = useContext(AuthContext);
    const pageCtx = useContext(PageStateContext);

    /**
     * Handles user login authentication
     * @param {string} emailParam - User email
     * @param {string} password - User password
     * @param {Function} setErrorMsg - Error message setter function
     * @returns {Promise<boolean>} True if login successful, false otherwise
     */
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
            setErrorMsg(e.response.data.message);
            return false
        }
    }

    /**
     * Handles user logout
     * @param {string} id - User ID
     * @returns {Promise<boolean>} True if logout successful, false otherwise
     */
    const logout = async (id) => {
        try {
            const res = await requestLogout(id);
            localStorage.removeItem('auth');

            authCtx.setAuth({
                isLogin: false,
                user: {
                    id: '',
                    email: '',
                    role: roles.OTHER
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

    /**
     * Refreshes authentication token
     * @returns {Promise<string|false>} New access token or false if refresh failed
     */
    const refreshToken = async () => {
        try {
            const res = await requestRefresh();
            console.log(res)

            if (res.data.code === 200) {
                const newAT = res.data?.data?.accessToken || res.data?.accessToken;
                console.log(newAT)
                const old = JSON.parse(localStorage.getItem('auth') || '{}');
                console.log(old)
                const next = {...old, token: newAT};
                localStorage.setItem('auth', JSON.stringify(next));

                authCtx.setAuth(prev => ({...prev, token: newAT}));
                return newAT;
            } else {
                localStorage.removeItem('auth');
                authCtx.setAuth({
                    isLogin: false,
                    user: {id: '', email: '', role: roles.OTHER},
                    token: ''
                });
                pageCtx.dispatch({type: pageState.NONE});
                return false
            }

        } catch (e) {
            localStorage.removeItem('auth');
            authCtx.setAuth({
                isLogin: false,
                user: {id: '', email: '', role: roles.OTHER},
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
