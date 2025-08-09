import React, {useState} from 'react';
import AuthContext from "./AuthContext.jsx";
import {roles} from "../utils/roles.js";

export default function AuthProvider({children}) {
    const [isLogin, setIsLogin] = useState(false);
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(roles.PARENT);

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
                setEmail
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
