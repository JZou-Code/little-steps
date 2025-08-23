import React, {useState} from 'react';
import classes from '../style/BindChildPage.module.css'
import {useNavigate} from "react-router-dom";
import LoginAnim from "../components/LoginAnim.jsx";

const BindChildPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('male');

    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(firstName,lastName,dob,gender);
    }

    const cancelHandler = (e) => {
        navigate('/account')
    }

    return (
        <div className={classes.Container}>
            <div className={classes.AnimContainer}>
                <LoginAnim/>
            </div>
            <form className={classes.FormContainer} onSubmit={submitHandler}>
                <div className={classes.Title}>
                    Bind Child
                </div>
                <div className={classes.InputContainer}>
                    <input
                        value={firstName}
                        className={classes.Input}
                        placeholder='First Name'
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className={classes.InputContainer}>
                    <input
                        value={lastName}
                        className={classes.Input}
                        placeholder='First Name'
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className={classes.InputContainer}>
                    <input
                        type='date'
                        value={dob}
                        className={classes.Input}
                        placeholder='First Name'
                        onChange={e => setDob(e.target.value)}
                    />
                </div>
                <div className={`${classes.InputContainer} ${classes.RadioContainer}`}>
                    <div className={classes.RadioWrapper}>
                        <input
                            id='gender-male'
                            type='radio'
                            name='gender'
                            value='male'
                            className={classes.Radio}
                            onChange={e => setGender('male')}
                        />
                        <label htmlFor='gender-male'>Male</label>
                    </div>

                    <div className={classes.RadioWrapper}>
                        <input
                            id='gender-female'
                            type='radio'
                            name='gender'
                            value='female'
                            className={classes.Radio}
                            onChange={e => setGender('female')}
                        />
                        <label htmlFor='gender-female'>Female</label>
                    </div>
                    <div className={classes.RadioWrapper}>
                        <input
                            id='gender-other'
                            type='radio'
                            name='gender'
                            value='other'
                            className={classes.Radio}
                            onChange={e => setGender('other')}
                        />
                        <label htmlFor='gender-other'>Other</label>
                    </div>
                </div>
                <div className={classes.ButtonGroup}>
                    <button className={classes.Button}>
                        Submit
                    </button>
                    <button onClick={cancelHandler} className={classes.Button}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default BindChildPage;
