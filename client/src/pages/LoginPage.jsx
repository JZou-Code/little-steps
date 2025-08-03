import React from 'react';
import classes from '../style/LoginPage.module.css'
import LoginAnim from "../components/LoginAnim.jsx";
import FormContainer from "../components/FormContainer.jsx";
import SetupAccount from "./SetupAccount.jsx";

const LoginPage = () => {
    return (
        <div>
            <SetupAccount/>
        </div>
    );
};

export default LoginPage;