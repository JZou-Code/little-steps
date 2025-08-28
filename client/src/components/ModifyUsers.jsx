import React, {useState} from 'react';
import classes from '../style/ModifyUsers.module.css'
import {roles} from "../utils/roles.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

const ModifyUsers = ({data, onCancel}) => {
    const [firstName, setFirstName] = useState(data.firstName || '');
    const [lastName, setLastName] = useState(data.lastName || '');
    const [role, setRole] = useState(data.role || roles.PARENT);

    const submitHandler = (e)=>{
        e.preventDefault();
    }

    return (
        <div className={`${classes.Container} popup`}>
            <FontAwesomeIcon className={classes.CancelIcon} onClick={onCancel} icon={faXmark}/>
            <form onSubmit={submitHandler} className={classes.Form}>
                <div className={classes.Title}>
                    Edit User
                </div>
                <div className={classes.InputContainer}>
                    <label className={classes.Subtitle} htmlFor={'modifyFirst'}>First Name:</label>
                    <input onChange={e=>{setFirstName(e.target.value)}} id={'modifyFirst'} value={firstName}/>
                </div>
                <div className={classes.InputContainer}>
                    <label className={classes.Subtitle} htmlFor={'modifyLast'}>Last Name:</label>
                    <input onChange={e=>{setLastName(e.target.value)}} id={'modifyLast'} value={lastName}/>
                </div>
                <div className={classes.InputContainer}>
                    <label className={classes.Subtitle} htmlFor={'modifyRole'}>Last Name:</label>
                    <select onChange={e=>{setRole(e.target.value)}} id={'modifyRole'}>
                        <option value={roles.PARENT} selected={role === roles.PARENT}>
                            {roles.PARENT}
                        </option>
                        <option value={roles.TEACHER} selected={role === roles.TEACHER}>
                            {roles.TEACHER}
                        </option>
                    </select>
                </div>
                <div className={classes.ButtonContainer}>
                    <button className={classes.Button}>Save</button>
                    <button type='button' onClick={onCancel} className={classes.Button}>Cancel</button>
                </div>
            </form>
        </div>

    );
};

export default ModifyUsers;
