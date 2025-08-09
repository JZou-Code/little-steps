import React from "react";
import {roles} from "../utils/roles.js";

const AuthContext = React.createContext({
    isLogin: false,
    user: {
        id: '',
        email: '',
        role: roles.PARENT
    },
    setIsLogin: () => {
    },
    setEmail: () => {
    }
});

export default AuthContext;
