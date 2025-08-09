import React, {useContext, useEffect} from 'react';
import SetupAccount from "../components/SetupAccount.jsx";
import PageStateContext from "../context/PageStateContext.jsx";
import {pageState} from "../utils/pageState.js";

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
