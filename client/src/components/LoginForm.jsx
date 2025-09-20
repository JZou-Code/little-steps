import React, {useContext, useEffect, useState} from 'react';
import classes from "../style/Forms.module.css";
import {pageState} from "../utils/pageState.js";
import PageStateContext from "../context/PageStateContext.jsx";
import {useLocation, useNavigate} from "react-router-dom";
// import {login} from "../api/login.js";
import authContext from "../context/AuthContext.jsx";
import useAuth from "../hook/useAuth.jsx";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('')

    const pageCtx = useContext(PageStateContext);
    const navigate = useNavigate();

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const {login} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isOk = await login(email, password, setErrorMsg)
        if (isOk) {
            navigate(from, {replace: true})
        }
    }
    return (
        <>
            <form className={classes.FormContainer} onSubmit={handleSubmit} style={{marginTop: '1.5rem'}}>
                <div className={classes.Title}>User Login</div>
                <div className={classes.InputContainer}>
                    <input
                        className={classes.Input}
                        value={email}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder={'Email'}
                    />
                </div>
                <div className={classes.InputContainer}>
                    <input
                        className={classes.Input}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder={'Password'}
                    />
                </div>
                <button className={classes.Button} type='submit'>Login</button>

                <div className={classes.Message}>
                    {errorMsg}
                </div>
            </form>

            <div className={classes.Notification}>
                <div className={classes.Forget} onClick={() => pageCtx.dispatch({type: pageState.FORGET})}>
                    <span className={classes.Link}>
                        Forgot password?
                    </span>
                </div>
                <div className={classes.LinkContainer}>
                    <div>
                        Not registered yet?
                    </div>
                    <div onClick={() => {
                        pageCtx.dispatch({type: pageState.SIGNUP})
                        navigate('/account/sign-up')
                    }} className={classes.Link}>
                        &nbsp;Signup for an account
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginForm;
