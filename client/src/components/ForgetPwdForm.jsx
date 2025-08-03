import React, {useContext, useState} from 'react';
import classes from "../style/Forms.module.css";
import {pageState} from "../utils/pageState.js";
import ValidationCode from "./ValidationCode.jsx";
import PageStateContext from "../context/PageStateContext.jsx";

const ForgetPwdForm = () => {
    const [email, setEmail] = useState('')
    const [validationCode, setValidationCode] = useState('')

    const ctx = useContext(PageStateContext);

    const handleSubmit = (e) => {
        ctx.dispatch({type: pageState.CONFIRM})
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

export default ForgetPwdForm;
