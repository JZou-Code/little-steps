import React from 'react';
import classes from '../../style/Confirm.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faCircleCheck, faXmark} from "@fortawesome/free-solid-svg-icons";

/**
 * Message component that displays success or error messages with icons
 * Shows appropriate icon based on success/failure flag
 * Includes close button for dismissing the message
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.flag - Success flag (true for success, false for error)
 * @param {string} props.message - Message text to display
 * @param {Function} props.onCancel - Close button click handler
 * @returns {JSX.Element} The message component
 */
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
