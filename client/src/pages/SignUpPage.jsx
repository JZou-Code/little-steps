import React, {useContext, useEffect} from 'react';
import SetupAccount from "../components/forms/SetupAccount.jsx";
import PageStateContext from "../context/PageStateContext.jsx";
import {pageState} from "../utils/pageState.js";

/**
 * SignUpPage component that displays the signup form
 * Sets the page state to SIGNUP mode when component mounts
 * Uses SetupAccount component to render the appropriate form
 * 
 * @returns {JSX.Element} The signup page component
 */
const SignUpPage = () => {
    const ctx = useContext(PageStateContext);
    useEffect(() => {
        ctx.dispatch({type:pageState.SIGNUP})
    }, []);

    return (
        <div>
            <SetupAccount/>
        </div>
    );
};

export default SignUpPage;
