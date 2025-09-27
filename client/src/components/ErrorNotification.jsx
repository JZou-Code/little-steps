import React from 'react';
import classes from '../style/ErrorNotification.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleExclamation, faXmark} from "@fortawesome/free-solid-svg-icons";
import Backdrop from "../UI/Backdrop/Backdrop.jsx";

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
