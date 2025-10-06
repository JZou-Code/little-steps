import React, {useContext} from 'react';
import PageStateContext from "../../context/PageStateContext.jsx";
import LoginForm from "./LoginForm.jsx";
import SignUpForm from "./SignUpForm.jsx";
import ForgetPwdForm from "./ForgetPwdForm.jsx";
import {pageState} from "../../utils/pageState.js";
import classes from '../../style/FormContainer.module.css'

/**
 * FormContainer component that manages form display based on page state
 * Conditionally renders login, signup, or forgot password forms
 * Uses page state context to determine which form to show
 * 
 * @returns {JSX.Element} The form container with conditional form rendering
 */
const FormContainer = () => {
    const ctx = useContext(PageStateContext);

    return (
        <div className={classes.Container}>
            {ctx.state === pageState.LOGIN && <LoginForm/>}
            {ctx.state === pageState.SIGNUP && <SignUpForm/>}
            {ctx.state === pageState.FORGET && <ForgetPwdForm/>}
        </div>
    );
};

export default FormContainer;
