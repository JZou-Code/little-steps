import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import classes from '../style/OtherNotification.module.css'
import Backdrop from "../UI/Backdrop/Backdrop.jsx";

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
