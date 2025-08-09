import React, {useCallback, useMemo, useState} from 'react';
import AuthContext from "./AuthContext.jsx";
import {roles} from "../utils/roles.js";
import useRefreshScheduler from "../hook/useRefreshScheduler.jsx";
import useAuth from "../hook/useAuth.jsx";

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
            return defaultAuth;
        }

        const {isLogin, token, user: {id, email, role}} = JSON.parse(stored) || {};
        if (token && id && email) {
            return {
                isLogin,
                user: {
                    id,
                    email,
                    role: role ?? roles.PARENT
                },
                token
            };
        }
        return defaultAuth;
    } catch {
        return defaultAuth;
    }
};

export default function AuthProvider({children}) {
    const [auth, setAuth] = useState(init);
    const {refreshToken} = useAuth();

    const refresh = useCallback(async () => {
        try {
            const newToken = await refreshToken();
            if (newToken) {
                setAuth(prev => {
                    const updated = {...prev, token: newToken};
                    localStorage.setItem('auth', JSON.stringify(updated));
                    return updated;
                });
            } else {
                setAuth(defaultAuth);
                localStorage.removeItem('auth');
            }
        } catch {
            setAuth(defaultAuth);
            localStorage.removeItem('auth');
        }
    }, [refreshToken]);

    useRefreshScheduler(auth.token, refresh);

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
