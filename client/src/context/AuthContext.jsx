import React from "react";
import {roles} from "../utils/roles.js";

/**
 * Authentication context that provides authentication state and methods
 * Defines the structure for user authentication data and operations
 * Contains default values for unauthenticated state
 */
const AuthContext = React.createContext({
    isLogin: false,
    user: {
        id: '',
        email: '',
        role: roles.OTHER
    },
    setAuth: () => {
    },
    setIsLogin:()=>{},
    setUsername: ()=>{},
    login:  (payload) => {},
    logout: () => {},
});

export default AuthContext;
