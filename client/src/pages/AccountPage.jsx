import React, {useState} from 'react';
import classes from '../style/AccountPage.module.css'
import axios from "axios";
import axiosApi from "../api/axiosApi.js";

const AccountPage = () => {
    const [msg, setMsg] = useState(null)

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
                        <button className={classes.Button}>
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
        </div>
    );
};

export default AccountPage;
