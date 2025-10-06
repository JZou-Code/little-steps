import React, {useState} from 'react';
import classes from '../../style/ChangePssword.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import ChangePasswordForm from "./ChangePasswordForm.jsx";
import {requestChangePassword} from "../../api/manageUsers.js";
import OtherNotification from "../common/notifications/OtherNotification.jsx";
import ErrorNotification from "../common/notifications/ErrorNotification.jsx";
import SuccessfulNotification from "../common/notifications/SuccessfulNotification.jsx";

/**
 * ChangePassword component that handles password change functionality
 * Wraps ChangePasswordForm with processing states and notifications
 * Handles API calls, error handling, and success feedback
 * Shows loading, error, and success states during password change
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onCancel - Cancel button click handler
 * @returns {JSX.Element} The change password component
 */
const ChangePassword = (props) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSucceed, setIsSucceed] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null)

    const changeHandler = async (data) => {
        setIsProcessing(true);

        try {
            const res = await requestChangePassword(data);
            console.log(res)
            if (res.data.code === 200 || res.data.code === '200') {
                setIsSucceed(true);
            } else {
                setIsError(true);
                setErrorMessage(res.data?.message || 'Something went wrong')
            }
        } catch (e) {
            console.log(e);
            setIsError(true);
            setErrorMessage(e.message || 'Something went wrong')
        } finally {
            setIsProcessing(false);
        }
    }

    const reset = () => {
        setIsProcessing(false);
        setIsError(false);
        setErrorMessage(null);
        setIsSucceed(false);
    }

    return (
        <div className={`${classes.Card} popup`}>
            <FontAwesomeIcon
                onClick={props.onCancel}
                className='dismiss'
                icon={faXmark}/>
            <ChangePasswordForm onSubmit={changeHandler}/>
            {
                isProcessing && <OtherNotification message={'Processing...'}/>
            }
            {
                isError && <ErrorNotification message={errorMessage} onClick={reset}/>
            }
            {
                isSucceed && <SuccessfulNotification
                    message={'Your password has been changed successfully.'}
                    buttonName={'Close'}
                    onClick={() => {
                        reset();
                        props.onCancel();
                    }}/>
            }
        </div>
    );
};

export default ChangePassword;
