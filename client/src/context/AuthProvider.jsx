import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import AuthContext from "./AuthContext.jsx";
import {roles} from "../utils/roles.js";
import useRefreshScheduler from "../hook/useRefreshScheduler.jsx";
import useAuth from "../hook/useAuth.jsx";
import {setupAuthInterceptors} from "../utils/setupAxios.js";

const defaultAuth = {
    isLogin: false,
    user: {
        id: '',
        email: '',
        role: roles.OTHER,
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
                    role: role ?? roles.OTHER
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

    const login = useCallback((authData) => {
        if (authData) {
            localStorage.setItem('auth', authData)
            setAuth(authData);
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('auth');
        setAuth(defaultAuth);
        window.location.assign('/account/login');
    }, []);

    const value = useMemo(() => {
        return {
            isLogin: auth.isLogin,
            user: auth.user,
            setAuth,
            login,
            logout
        }
    }, [auth]);

    const didMount = useRef(false);
    useEffect(() => {
        if (didMount.current) {
            return
        }
        didMount.current = true;
        setupAuthInterceptors({logout});
    }, [logout]);

    return (
        <AuthContext.Provider
            value={value}
        >
            {children}
        </AuthContext.Provider>
    );
}
