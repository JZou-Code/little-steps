import React, {useContext} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import PageStateContext from "../context/PageStateContext.jsx";
import LoginForm from "./LoginForm.jsx";
import SignUpForm from "./SignUpForm.jsx";
import ForgetPwdForm from "./ForgetPwdForm.jsx";
import ConfirmForm from "./ConfirmForm.jsx";
import {pageState} from "../utils/pageState.js";
import classes from '../style/FormContainer.module.css'

const FormContainer = () => {
    const ctx = useContext(PageStateContext);

    return (
        <div className={classes.Container}>
            {ctx.state === pageState.LOGIN && <LoginForm/>}
            {ctx.state === pageState.SIGNUP && <SignUpForm/>}
            {ctx.state === pageState.FORGET && <ForgetPwdForm/>}
            {ctx.state === pageState.CONFIRM && <ConfirmForm/>}
        </div>
    );
};

export default FormContainer;