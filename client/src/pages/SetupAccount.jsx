import React from 'react';
import classes from '../style/LoginPage.module.css'
import LoginAnim from "../components/LoginAnim.jsx";
import FormContainer from "../components/FormContainer.jsx";


const SetupAccount = () => {
    return (
        <div className={classes.Container}>
            <div className={classes.AnimContainer}>
                <LoginAnim/>
            </div>
            <div className={classes.FormContainer}>
                <FormContainer/>
            </div>
        </div>
    );
};

export default SetupAccount;