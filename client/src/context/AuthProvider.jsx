import React, {useEffect, useMemo, useState} from 'react';
import AuthContext from "./AuthContext.jsx";
import {roles} from "../utils/roles.js";

const defaultAuth = {
    isLogin: false,
    user: {
        id: '',
        email: '',
        role: roles.PARENT,
    },
    token: ''
};

const init = () => {
    try {
        const stored = localStorage.getItem('auth');
        if (!stored) {
            return {
                isLogin: false,
                user: {
                    id: '',
                    email: '',
                    role: roles.PARENT
                },
                token: ''
            };
        }
        const {token, id, email, role} = JSON.parse(stored) || {};
        if (token && id && email) {
            return {
                isLogin: true,
                user: {
                    id,
                    email,
                    role: role ?? roles.PARENT
                },
                token
            };
        }
    } catch {
        return defaultAuth;
    }
};

export default function AuthProvider({children}) {
    const [auth, setAuth] = useState(init);
    const value = useMemo(() => {
        return {
            isLogin: auth.isLogin,
            user: auth.user,
            setAuth
        }
    }, [auth]);

    return (
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    );
}
