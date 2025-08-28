import React from 'react';
import classes from '../style/Confirm.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faCircleCheck, faXmark} from "@fortawesome/free-solid-svg-icons";

const Message = (props) => {
    return (
        <div className={classes.Container}>
            <FontAwesomeIcon className={classes.CancelIcon} onClick={props.onCancel} icon={faXmark}/>
            <div className={classes.Title} style={{fontSize: '3rem', margin: '1rem 0'}}>
                {props.flag ? <FontAwesomeIcon style={{color: 'green'}} icon={faCircleCheck}/> :
                    <FontAwesomeIcon style={{color: 'orangered'}} icon={faBan}/>}
            </div>
            <div className={classes.Title}>
                {props.message}
            </div>

        </div>
    );
};

export default Message;
