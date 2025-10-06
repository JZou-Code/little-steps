import React from 'react';
import classes from '../../style/Confirm.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

const Confirm = (props) => {
    return (
        <div className={`${classes.Container} popup`}>
            <FontAwesomeIcon onClick={props.onCancel} className={classes.CancelIcon} icon={faXmark}/>
            <div className={classes.Title}>
                Delete User
            </div>
            <div className={classes.Text}>
                Confirm to delete?
            </div>
            <div className={classes.ButtonContainer}>
                <button onClick={props.onConfirm} className={classes.Button}>Confirm</button>
                <button onClick={props.onCancel} className={classes.Button}>Cancel</button>
            </div>
        </div>
    );
};

export default Confirm;
