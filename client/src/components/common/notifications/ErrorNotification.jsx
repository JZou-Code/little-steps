import React from 'react';
import classes from '../../../style/ErrorNotification.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faXmark} from "@fortawesome/free-solid-svg-icons";
import Backdrop from "../../../UI/Backdrop/Backdrop.jsx";

/**
 * ErrorNotification component that displays error messages in a modal overlay
 * Shows error icon (exclamation circle), title, and message with close functionality
 * Uses backdrop for modal display with FontAwesome icons
 * Provides user-friendly error feedback for failed operations
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - Error message to display to user
 * @param {Function} props.onClick - Close button click handler to dismiss notification
 * @returns {JSX.Element} The error notification modal component
 */
const ErrorNotification = (props) => {
    return (
        <Backdrop>
            <div className={classes.Container}>
                <FontAwesomeIcon className={classes.CancelIcon} icon={faXmark} onClick={props.onClick}/>
                <div className={classes.Body}>
                    <FontAwesomeIcon className={classes.ErrorIcon} icon={faCircleExclamation}/>
                    <div className={classes.Content}>
                        <div className={classes.Title}>
                            Error
                        </div>
                        <div className={classes.Message}>
                            {props.message}
                        </div>
                    </div>
                </div>
            </div>
        </Backdrop>
    );
};

export default ErrorNotification;
