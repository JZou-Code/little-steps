import React, {useState} from 'react';
import classes from '../../style/ModifyUsers.module.css'
import {roles} from "../../utils/roles.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {updateUserById} from "../../api/manageUsers.js";

/**
 * ModifyUsers component that handles user information editing
 * Provides form for updating user details including name and role
 * Handles form submission and success/error notifications
 * Supports role selection between PARENT and TEACHER
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - User data to modify
 * @param {Function} props.onCancel - Cancel button click handler
 * @param {Function} props.setupMsg - Function to show success/error messages
 * @param {Function} props.loadUsers - Function to reload users list
 * @returns {JSX.Element} The modify users component
 */
const ModifyUsers = ({data, onCancel, setupMsg, loadUsers}) => {
    const [firstName, setFirstName] = useState(data?.firstName || '');
    const [lastName, setLastName] = useState(data?.lastName || '');
    const [role, setRole] = useState(data?.role === roles.TEACHER ? roles.TEACHER : roles.PARENT);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateUserById(data.id, {firstName, lastName, role});
            setupMsg('Edit Successfully', true);
        } catch (e) {
            setupMsg('Edit Failed', false);
        }finally {
            onCancel();
            loadUsers();
        }
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
                    <input onChange={e => {
                        setFirstName(e.target.value)
                    }} id={'modifyFirst'} value={firstName}/>
                </div>
                <div className={classes.InputContainer}>
                    <label className={classes.Subtitle} htmlFor={'modifyLast'}>Last Name:</label>
                    <input onChange={e => {
                        setLastName(e.target.value)
                    }} id={'modifyLast'} value={lastName}/>
                </div>
                <div className={classes.InputContainer}>
                    <label className={classes.Subtitle} htmlFor={'modifyRole'}>Last Name:</label>
                    <select
                        value={role}
                        onChange={e => {
                            setRole(e.target.value)
                        }} id={'modifyRole'}>
                        <option value={roles.PARENT}>
                            {roles.PARENT}
                        </option>
                        <option value={roles.TEACHER}>
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
