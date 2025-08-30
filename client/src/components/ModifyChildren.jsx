import React, {useState} from 'react';
import classes from '../style/ModifyUsers.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {updateChildById} from "../api/manageChildren.js";

const ModifyUsers = ({data, onCancel, bindChild, setupMsg, loadChildren}) => {
    const [firstName, setFirstName] = useState(data?.firstName || '');
    const [lastName, setLastName] = useState(data?.lastName || '');
    const [dob, setDob] = useState(data?.dob || '');
    const [gender, setGender] = useState(data?.gender || '');

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await updateChildById(data.id, {firstName, lastName, dob: dob + 'T00:00:00.000Z', gender});
            setupMsg('Edit Successfully', true);
        } catch (e) {
            setupMsg('Edit Failed', false);
        } finally {
            onCancel();
            loadChildren();
        }
    }

    return (
        <div className={`${classes.Container} popup`}>
            <FontAwesomeIcon className={classes.CancelIcon} onClick={onCancel} icon={faXmark}/>
            <form onSubmit={submitHandler} className={classes.Form}>
                <div className={classes.Title}>
                    Edit Child
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
                    <label className={classes.Subtitle} htmlFor={'modifyDob'}>Date of Birth:</label>
                    <input
                        type='date'
                        onChange={e => {
                            setDob(e.target.value)
                        }} id={'modifyDob'} value={dob}/>
                </div>
                <div className={classes.InputContainer}>
                    <label className={classes.Subtitle} htmlFor={'modifyRole'}>Last Name:</label>
                    <select
                        value={gender}
                        onChange={e => {
                            setGender(e.target.value)
                        }} id={'modifyRole'}>
                        <option value='male'>
                            Male
                        </option>
                        <option value='female'>
                            Female
                        </option>
                        <option value='other'>
                            Other
                        </option>
                    </select>
                </div>
                <div className={classes.ButtonContainer}>
                    <button className={classes.Button}>Save</button>
                    <button type='button' onClick={onCancel} className={classes.Button}>Cancel</button>
                    <button type='button' onClick={bindChild} className={classes.Button}>Bind</button>
                </div>
            </form>
        </div>
    );
};

export default ModifyUsers;
