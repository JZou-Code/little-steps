import React from 'react';
import classes from "../style/ChangePssword.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan} from "@fortawesome/free-solid-svg-icons";

const ChangeMessage = (props) => {
    console.log(props)
    return (
        <div className={classes.MessageContainer}>
            <div className={classes.ImageBox}>
                {
                    props.data.isError ?
                        <FontAwesomeIcon className={classes.ErrorImage} icon={faBan}/> :
                        <img className={classes.Image} alt={'Change Succeed'} src={'/changeSucceed.jpg'}/>
                }
            </div>
            <div className={classes.MessageTitle}>
                {props.data.title}
            </div>
            <div className={classes.MessageText}>
                {props.data.message}
            </div>
        </div>
    );
};

export default ChangeMessage;
