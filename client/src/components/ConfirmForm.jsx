import React, {useContext, useState} from 'react';
import classes from "../style/Forms.module.css";
import {pageState} from "../utils/pageState.js";
import PageStateContext from "../context/PageStateContext.jsx";

const ConfirmForm = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    const ctx = useContext(PageStateContext);

    const handleSubmit = (e)=>{
        e.preventDefault();
        ctx.dispatch({type: pageState.CONFIRM})
    }

    return (
        <>
            <form className={classes.FormContainer} onSubmit={handleSubmit} style={{marginTop: '3rem'}}>
                <div className={classes.Title}>Reset Password</div>
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
                <button className={classes.Button} type='sumbit'>Next</button>
            </form>
            <div className={classes.Notification}>
                <div className={classes.LinkContainer}>
                    <div onClick={() => ctx.dispatch({type: pageState.LOGIN})} className={classes.Link}>
                        LOG IN
                    </div>
                </div>
            </div>
        </>

    );
};

export default ConfirmForm;