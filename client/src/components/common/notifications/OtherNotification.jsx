import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import classes from '../../../style/OtherNotification.module.css'
import Backdrop from "../../../UI/Backdrop/Backdrop.jsx";

/**
 * OtherNotification component that displays loading or informational messages in a modal
 * Shows spinning loader icon and message text without close button
 * Used for loading states, processing indicators, and general notifications
 * Automatically displays without user interaction required
 * 
 * @param {Object} props - Component props
 * @param {string} props.message - Loading or informational message to display
 * @returns {JSX.Element} The loading/notification modal component
 */
const OtherNotification = (props) => {
    return (
        <Backdrop>
            <div className={classes.Container}>
                {/*<FontAwesomeIcon className={classes.CancelIcon} icon={faXmark}/>*/}
                <div className={classes.Body}>
                    <FontAwesomeIcon className={classes.LoadingIcon} icon={faSpinner}/>
                    <div className={classes.Content}>
                        <div className={classes.Title}>
                            {props.message}
                        </div>
                    </div>
                </div>
            </div>
        </Backdrop>
    );
};

export default OtherNotification;
