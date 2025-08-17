import React, {useContext, useState} from 'react';
import classes from '../style/AccountPage.module.css'
import axios from "axios";
import axiosApi from "../api/axiosApi.js";
import {useNavigate} from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import {roles} from "../utils/roles.js";

const AccountPage = () => {
    const [msg, setMsg] = useState(null)
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    const test = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('auth') || '{}')?.token || '';
            const res = await axios.post('http://localhost:3000/user/profile',
                {},
                {
                    headers: token ? {Authorization: `Bearer ${token}`} : {}
                });
            setMsg(`OK ${res.status} — ${JSON.stringify(res.data)}`);
        } catch (e) {
            setMsg(`ERR ${e?.response?.status} — ${e?.response?.data?.message || e.message}`);
        }
    }

    const newsletterHandler = () => {
        navigate('/newsletter')
    }

    const navigateToAdmin = () => {
        navigate('/admin-dashboard')
    }

    return (
        <div className={classes.Container}>
            <section className={classes.Newsletter}>
                <div className={classes.ImageContainer}>
                    <img className={classes.Image} alt='Newsletter'
                         src='../public/images/account-page/newsletter.jpg'/>
                </div>
                <div className={classes.Content}>
                    <div className={classes.Title}>
                        Newsletter
                    </div>
                    <div className={classes.Text}>
                        Stay connected with our kindergarten through our monthly newsletter! Get quick updates on
                        upcoming events, classroom highlights, and helpful tips for supporting your child’s learning.
                        It’s the easiest way to share special moments and keep families in the loop.
                    </div>
                    <div className={classes.ButtonContainer}>
                        <button onClick={newsletterHandler} className={classes.Button}>
                            More
                        </button>
                    </div>
                </div>
            </section>
            <section className={classes.Newsletter}>
                <div className={classes.Content}>
                    <div className={classes.Title}>
                        Āku Tamariki
                    </div>
                    <div className={classes.Text}>
                        Stay connected with our kindergarten through our monthly newsletter! Get quick updates on
                        upcoming events, classroom highlights, and helpful tips for supporting your child’s learning.
                        It’s the easiest way to share special moments and keep families in the loop.
                    </div>
                    <div className={classes.ButtonContainer}>
                        <button
                            onClick={test}
                            className={classes.Button}>
                            hello - {msg}
                        </button>
                    </div>
                </div>
                <div className={classes.ImageContainer}>
                    <img className={classes.Image} alt='Newsletter'
                         src='../public/images/account-page/newsletter.jpg'/>
                </div>
            </section>
            <section className={classes.Newsletter}>
                <div className={classes.ImageContainer}>
                    <img className={classes.Image} alt='Newsletter'
                         src='../public/images/account-page/newsletter.jpg'/>
                </div>
                <div className={classes.Content}>
                    <div className={classes.Title}>
                        Security Settings
                    </div>
                    <div className={classes.Text}>
                        Easily change your password here to keep your account secure and prevent unauthorized access.
                    </div>
                    <div className={classes.ButtonContainer}>
                        <button onClick={newsletterHandler} className={classes.Button}>
                            Go
                        </button>
                    </div>
                </div>
            </section>
            {
                authCtx.user.role === roles.ADMIN &&
                <section className={classes.Newsletter}>
                    <div className={classes.Content}>
                        <div className={classes.Title}>
                            Admin Dashboard
                        </div>
                        <div className={classes.Text}>
                            This section is restricted to staff only. Here, administrators can monitor system activity,
                            manage accounts, and update important kindergarten information."
                        </div>
                        <div className={classes.ButtonContainer}>
                            <button
                                onClick={navigateToAdmin}
                                className={classes.Button}>
                                Manage
                            </button>
                        </div>
                    </div>
                    <div className={classes.ImageContainer}>
                        <img className={classes.Image} alt='Newsletter'
                             src='../public/images/account-page/newsletter.jpg'/>
                    </div>
                </section>
            }
        </div>
    );
};

export default AccountPage;
