import React, {useEffect, useState} from 'react';
import AuthContext from "./AuthContext.jsx";
import {roles} from "../utils/roles.js";

export default function AuthProvider({children}) {
    const [isLogin, setIsLogin] = useState(false);
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(roles.PARENT);
    const [token, setToken] = useState('')

    useEffect(() => {
        const raw = localStorage.getItem('auth');
        if (!raw) return;
        try {
            const { token: tk, id: uid, email: em, role: r } = JSON.parse(raw) || {};
            if (tk && uid && em) {
                setToken(tk);
                setId(uid);
                setEmail(em);
                setRole(r ?? roles.PARENT);
                setIsLogin(true);
            }
        } catch (e) {
            console.error('parse auth failed', e);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLogin,
                user: {
                    id,
                    email,
                    role
                },
                setIsLogin,
                setId,
                setEmail,
                setRole
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
