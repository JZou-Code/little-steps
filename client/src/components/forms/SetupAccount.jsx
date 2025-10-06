import React from 'react';
import classes from '../../style/LoginPage.module.css'
import LoginAnim from "../common/LoginAnim.jsx";
import FormContainer from "./FormContainer.jsx";


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
