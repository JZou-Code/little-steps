import React, {useContext} from 'react';
import classes from "../../style/Header.module.css";
import {pageState} from "../../utils/pageState.js";
import {useNavigate} from "react-router-dom";
import pageStateContext from "../../context/PageStateContext.jsx";

/**
 * HeaderLogin component that displays login/signup buttons
 * Shows login and signup buttons for unauthenticated users
 * Handles navigation to authentication pages
 * 
 * @returns {JSX.Element} The header login component with auth buttons
 */
const HeaderLogin = () => {
    const ctx = useContext(pageStateContext);
    const navigate = useNavigate();

    return (
        <div className={classes.LoginContainer}>
            <div className={`${classes.Button} ${classes.Login}`}
                 onClick={() => {
                     ctx.dispatch({type: pageState.LOGIN})
                     navigate('/account/login')
                 }}>Log In
            </div>
            <div className={`${classes.Button} ${classes.SignUp}`}
                 onClick={() => {
                     ctx.dispatch({type: pageState.SIGNUP})
                     navigate('/account/sign-up')
                 }}>Sign Up
            </div>
        </div>
    );
};

export default HeaderLogin;
