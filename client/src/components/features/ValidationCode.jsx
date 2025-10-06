import React, {useState} from 'react';
import classes from "../../style/Forms.module.css";
import {requestValidationCode} from "../../api/signUp.js";

/**
 * ValidationCode component that handles email validation code functionality
 * Provides input field for validation code and send/resend button
 * Implements countdown timer for resend functionality
 * 
 * @param {Object} props - Component props
 * @param {string} props.email - Email address for sending validation code
 * @param {string} props.code - Validation code value
 * @param {Function} props.setCode - Function to update validation code
 * @returns {JSX.Element} The validation code component
 */
const ValidationCode = (props) => {
    const [buttonContent, setButtonContent] = useState('Send')
    const [disabled, setDisabled] = useState(false)

    const onSendCode = () => {
        let seconds = 60
        setDisabled(true);
        requestValidationCode(props.email)
        setButtonContent(`${seconds}s`)

        const timer = setInterval(() => {
            seconds--
            setButtonContent(`${seconds}s`)
            if (seconds <= 0) {
                clearInterval(timer);
                setButtonContent('Resend');
                setDisabled(false);
            }
        }, 1000)
    }

    return (
        <div className={`${classes.InputContainer} ${classes.CaptchaContainer}`}>
            <input
                className={classes.CaptchaInput}
                type="text"
                value={props.code}
                onChange={(e) => props.setCode(e.target.value)}
                required
                placeholder={'Code'}
            />
            <div
                className={classes.CaptchaImg}
            >
                <button
                    type={'button'}
                    disabled={disabled}
                    className={`${classes.Send} ${disabled ? classes.disabled : ''}`}
                    onClick={onSendCode}
                >
                    {buttonContent}
                </button>
            </div>
        </div>
    );
};

export default ValidationCode;
