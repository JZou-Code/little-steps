import React from 'react';
import classes from '../../style/LoginPage.module.css'
import LoginAnim from "../features/LoginAnim.jsx";
import FormContainer from "./FormContainer.jsx";

/**
 * SetupAccount component that displays the account setup interface
 * Contains login animation and form container for user authentication
 * Used by both login and signup pages with different form states
 * 
 * @returns {JSX.Element} The account setup component with animation and form
 */
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
