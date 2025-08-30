import React, {useState} from 'react';
import classes from '../style/AddChildPage.module.css'
import {useLocation, useNavigate} from "react-router-dom";
import LoginAnim from "../components/LoginAnim.jsx";
import {addNewChild} from "../api/manageChildren.js";

const AddChildPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('male');

    const [message, setMessage] = useState('')

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const newDob = dob+'T00:00:00.000Z'
            const res = await addNewChild({firstName, lastName, dob: newDob, gender});
        } catch (e) {
            setMessage(e.data)
        }
        navigate('/admin-dashboard')
    }

    const cancelHandler = (e) => {
        navigate('/admin-dashboard')
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
                        required={true}
                        value={firstName}
                        className={classes.Input}
                        placeholder='First Name'
                        onChange={e => setFirstName(e.target.value)}
                    />
                </div>
                <div className={classes.InputContainer}>
                    <input
                        required={true}
                        value={lastName}
                        className={classes.Input}
                        placeholder='Last Name'
                        onChange={e => setLastName(e.target.value)}
                    />
                </div>
                <div className={classes.InputContainer}>
                    <input
                        type='date'
                        required={true}
                        value={dob}
                        className={classes.Input}
                        placeholder='Date of Birth'
                        onChange={e => setDob(e.target.value)}
                    />
                </div>
                <div className={`${classes.InputContainer} ${classes.RadioContainer}`}>
                    <div className={classes.RadioWrapper}>
                        <input
                            checked={gender === 'male'}
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
                            checked={gender === 'female'}
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
                            checked={gender === 'other'}
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
                <div className={classes.Message}>
                    {message}
                </div>
            </form>
        </div>
    )
        ;
};

export default AddChildPage;
