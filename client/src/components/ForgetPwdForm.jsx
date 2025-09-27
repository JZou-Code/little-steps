import React, {useContext, useState} from 'react';
import classes from "../style/Forms.module.css";
import {pageState} from "../utils/pageState.js";
import ValidationCode from "./ValidationCode.jsx";
import PageStateContext from "../context/PageStateContext.jsx";
import ErrorNotification from "./ErrorNotification.jsx";
import {isValidEmail, isValidPassword} from "../utils/regex.js";

const ForgetPwdForm = () => {
    const [email, setEmail] = useState('')
    const [validationCode, setValidationCode] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const [errorMsg, setErrorMsg] = useState(null);
    const [isSubmit, setIsSubmit] = useState(false);

    const ctx = useContext(PageStateContext);

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const invalid = validationRules.find(rule => !rule.check());
        if (invalid) {
            setErrorMsg(invalid.message);
            return;
        }

        setIsSubmit(true);
    }

    return (
        <>
            <form className={classes.FormContainer} onSubmit={handleSubmit} style={{marginTop: '3rem'}}>
                <div className={classes.Title}>Forget Password</div>
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
                <ValidationCode code={validationCode} setCode={setValidationCode} email={email}></ValidationCode>
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
                <div className={classes.Message}>
                    {errorMsg}
                </div>
                <button className={classes.Button} type='sumbit'>Submit</button>
            </form>
            <div className={classes.Notification}>
                <div className={classes.LinkContainer}>
                    <div onClick={() => ctx.dispatch({type: pageState.LOGIN})} className={classes.Link}>
                        Login
                    </div>
                </div>
            </div>
            {
                isSubmit && <ErrorNotification message={'Not implemented yet'} onClick={()=>{setIsSubmit(false)}}/>
            }
        </>
    );
};

export default ForgetPwdForm;
