import React, {useState} from 'react';
import classes from '../style/ChangePssword.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import ChangePasswordForm from "./ChangePasswordForm.jsx";
import {requestChangePassword} from "../api/manageUsers.js";
import OtherNotification from "./OtherNotification.jsx";
import ErrorNotification from "./ErrorNotification.jsx";
import SuccessfulNotification from "./SuccessfulNotification.jsx";

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
                    message={'Your password has been changed successfully Use your new password to login in.'}
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
