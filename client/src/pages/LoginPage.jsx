import React, {useContext, useEffect} from 'react';
import SetupAccount from "../components/forms/SetupAccount.jsx";
import PageStateContext from "../context/PageStateContext.jsx";
import {pageState} from "../utils/pageState.js";

/**
 * LoginPage component that displays the login form
 * Sets the page state to LOGIN mode when component mounts
 * Uses SetupAccount component to render the appropriate form
 * 
 * @returns {JSX.Element} The login page component
 */
const LoginPage = () => {
    const ctx = useContext(PageStateContext);
    useEffect(() => {
        ctx.dispatch({type:pageState.LOGIN})
    }, []);

    return (
        <div>
            <SetupAccount/>
        </div>
    );
};

export default LoginPage;
