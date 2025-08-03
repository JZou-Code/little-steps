import React from 'react';
import classes from '../style/LoginPage.module.css'
import LoginAnim from "../components/LoginAnim.jsx";

const LoginPage = () => {
    return (
        <div className={classes.Container}>
            <div className={classes.AnimContainer}>
                <LoginAnim/>
            </div>
            <div className={classes.FormContainer}>

            </div>
        </div>
    );
};

export default LoginPage;