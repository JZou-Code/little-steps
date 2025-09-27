import React, {useState} from 'react';
import classes from "../style/ChangePssword.module.css";
import {isValidPassword} from "../utils/regex.js";

const ChangePasswordForm = (props) => {
    const [currentPwd, setCurrentPwd] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const [confirm, setConfirm] = useState('');

    const [errorMsg, setErrorMsg] = useState('')

    const validationRules = [
        {
            check: () => isValidPassword(currentPwd),
            message: "Current password must be 8–20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).",
        },
        {
            check: () => isValidPassword(newPwd),
            message: "New password must be 8–20 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).",
        },
        {
            check: () => newPwd === confirm,
            message: "Passwords do not match.",
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = localStorage.getItem('auth').user?.id
        const invalid = validationRules.find(rule => !rule.check());
        if (invalid) {
            setErrorMsg(invalid.message);
            return;
        }
        props.onSubmit({
            id,
            currentPwd,
            newPwd
        });
    }

    return (
        <div>
            <div className={classes.Title}>
                Reset Password
            </div>
            <form onSubmit={handleSubmit}>
                <div className={classes.InputContainer}>
                    <div className={classes.InputTitle}>
                        Enter your current password
                    </div>
                    <input
                        placeholder='Current password'
                        type='password'
                        className={classes.Input}
                        value={currentPwd}
                        onChange={e => {
                            setCurrentPwd(e.target.value)
                        }}/>
                </div>
                <div className={classes.InputContainer}>
                    <div className={classes.InputTitle}>
                        Enter a new password
                    </div>
                    <input
                        placeholder='New password'
                        type='password'
                        className={classes.Input}
                        value={newPwd}
                        onChange={e => {
                            setNewPwd(e.target.value)
                        }}/>
                </div>
                <div className={classes.InputContainer}>
                    <div className={classes.InputTitle}>
                        Confirm your new password
                    </div>
                    <input
                        placeholder='Confirm password'
                        type='password'
                        className={classes.Input}
                        value={confirm}
                        onChange={e => {
                            setConfirm(e.target.value)
                        }}/>
                </div>
                <div className={classes.InputContainer}>
                    <button
                        className={classes.CardButton}>
                        Change password
                    </button>
                </div>
            </form>
            <div className={classes.Message}>
                {errorMsg}
            </div>
        </div>
    );
};

export default ChangePasswordForm;
