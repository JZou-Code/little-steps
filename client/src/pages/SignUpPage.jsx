import React, {useContext, useEffect} from 'react';
import SetupAccount from "../components/SetupAccount.jsx";
import PageStateContext from "../context/PageStateContext.jsx";
import {pageState} from "../utils/pageState.js";

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
