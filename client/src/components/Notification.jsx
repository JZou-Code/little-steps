import React from 'react';
import Backdrop from "../UI/Backdrop/Backdrop.jsx";
import classes from '../style/Notification.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

const Notification = (props) => {
    return (
        <Backdrop>
            <div className={classes.Notification}>
                {
                    props.enableIcon &&
                    <FontAwesomeIcon onClick={props?.onClick} className={classes.CloseIcon} icon={faXmark}/>
                }
                {props.message}
            </div>
        </Backdrop>
    );
};

export default Notification;
