import React from 'react';
import classes from '../../../style/SuccessfulNotification.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import Backdrop from "../../../UI/Backdrop/Backdrop.jsx";

const SuccessfulNotification = (props) => {
    return (
        <Backdrop>
            <div className={classes.Container}>
                <FontAwesomeIcon className={classes.CancelIcon} icon={faXmark} onClick={props.onClick}/>
                <div className={classes.Body}>
                    <FontAwesomeIcon className={classes.SuccessfulIcon} icon={faCircleCheck}/>
                    <div className={classes.Content}>
                        <div className={classes.Title}>
                            Completed
                        </div>
                        <div className={classes.Message}>
                            {props.message}
                        </div>
                        <div className={classes.ButtonWrapper}>
                            <button className={classes.Button} onClick={props.onClick}>
                                {props.buttonName}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Backdrop>
    );
};

export default SuccessfulNotification;
