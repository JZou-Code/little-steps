import React, {useContext, useReducer, useState} from 'react';
import classes from "../../style/Forms.module.css";
// import Captcha from "./Captcha.jsx";
// import {requestSignUp, requestValidationCode} from "../api/signUp.js";
import {isValidEmail, isValidPassword, isValidUsername} from "../../utils/regex.js";
import {pageState} from "../../utils/pageState.js";
// import ValidationCode from "./ValidationCode.jsx";
import PageStateContext from "../../context/PageStateContext.jsx";
import ValidationCode from "../features/ValidationCode.jsx";
import Captcha from "../common/Captcha.jsx";
import {useNavigate} from "react-router-dom";
import {requestSignUp} from "../../api/signUp.js";

const SignUpForm = () => {
    // Input values, all string
    const [email, setEmail] = useState('');
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const [captchaId, setCaptchaId] = useState('')
    // const [validationCode, setValidationCode] = useState('')
    // const [captcha, setCaptcha] = useState('');

    const [errorMsg, setErrorMsg] = useState('')

    const ctx = useContext(PageStateContext);

    const navigate = useNavigate();

    const validationRules = [
        {
            check: () => isValidEmail(email),
            message: "Email must be in a valid format (e.g. username@domain.com).",
        },
        {
            check: () => isValidPassword(password),
            message: "Password must be 8–20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).",
        },
        {
            check: () => password === confirmPassword,
            message: "Passwords do not match.",
        },
    ];

    const onSignUp = (e) => {
        e.preventDefault();

        const invalid = validationRules.find(rule => !rule.check());
        if (invalid) {
            setErrorMsg(invalid.message);
            return;
        }

        requestSignUp({
            email,
            password,
            firstName,
            lastName
        }).then(result => {
            if(result.data.code === '200'){
                ctx.dispatch(pageState.LOGIN)
                navigate('/account/login')
            }else {
                setErrorMsg(result.data.message)
            }
        }).catch(e => {
            console.log(e)
            setErrorMsg(e.message)
        })
    }

    return (
        <>
            <form
                className={classes.FormContainer}
                onSubmit={onSignUp}
            >
                <div className={classes.Title}>Sign Up</div>
                <div className={classes.InputContainer}>
                    <input
                        className={classes.Input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder={'Email'}
                    />
                </div>
                {/*<ValidationCode code={validationCode} setCode={setValidationCode} email={email}></ValidationCode>*/}
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
                <div className={classes.InputContainer}>
                    <input
                        className={classes.Input}
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder={'Confirm Password'}
                    />
                </div>
                <div className={classes.InputContainer}>
                    <input
                        className={classes.Input}
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        placeholder={'First Name'}
                    />
                </div>
                <div className={classes.InputContainer}>
                    <input
                        className={classes.Input}
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        placeholder={'Last Name'}
                    />
                </div>
                {/*<div className={`${classes.InputContainer} ${classes.CaptchaContainer}`}>*/}
                {/*    <input*/}
                {/*        className={classes.CaptchaInput}*/}
                {/*        type="text"*/}
                {/*        value={captcha}*/}
                {/*        onChange={(e) => setCaptcha(e.target.value)}*/}
                {/*        required*/}
                {/*        placeholder={'Captcha'}*/}
                {/*    />*/}
                {/*    <div*/}
                {/*        className={classes.CaptchaImg}*/}
                {/*    >*/}
                {/*        <Captcha setCaptchaId={setCaptchaId}/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <button
                    onClick={onSignUp}
                    className={classes.Button}
                    type="submit"
                >
                    Sign Up
                </button>
                <div className={classes.Message}>
                    {errorMsg}
                </div>
            </form>

            <div className={classes.Notification_Login}>
                <div className={classes.LinkContainer}>
                    <div>
                        Already have an account?
                    </div>
                    <div onClick={() => {
                        ctx.dispatch({type: pageState.LOGIN})
                        navigate('/account/login')
                    }} className={classes.Link}>
                    &nbsp;Login
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUpForm;
