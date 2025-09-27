import React, {useContext, useState} from 'react';
import classes from '../style/AccountPage.module.css'
import {useNavigate} from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import {roles} from "../utils/roles.js";
import myChildren from '../assets/account-page/my-children.jpg'
import newsletterImage from '../assets/account-page/newsletter.jpg'
import Backdrop from "../UI/Backdrop/Backdrop.jsx";
import ChangePassword from "../components/ChangePassword.jsx";
import OtherNotification from "../components/OtherNotification.jsx";
import SuccessfulNotification from "../components/SuccessfulNotification.jsx";
import ErrorNotification from "../components/ErrorNotification.jsx";

const AccountPage = () => {
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);
    const [isChanging, setIsChanging] = useState(false);

    const navigateToNewsletter = () => {
        navigate('/newsletter')
    }

    const navigateToChildMessage = () => {
        navigate('/child-message')
    }

    const popupBoard = () => {
        setIsChanging(true);
    }

    const cancelChange = () => {
        setIsChanging(false);
    }

    const navigateToAdmin = () => {
        navigate('/admin-dashboard')
    }

    return (
        <div className={classes.Container}>
            <section className={classes.ContentBlock}>
                <div className={classes.ImageContainer}>
                    <img className={classes.Image} alt='Newsletter'
                         src={newsletterImage}/>
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
                        <button onClick={navigateToNewsletter} className={classes.Button}>
                            More
                        </button>
                    </div>
                </div>
            </section>

            <section className={classes.ContentBlock}>
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
                            onClick={navigateToChildMessage}
                            className={classes.Button}>
                            Go
                        </button>
                    </div>
                </div>
                <div className={classes.ImageContainer}>
                    <img className={classes.Image} alt='Newsletter'
                         src={myChildren}/>
                </div>
            </section>

            <section className={classes.ContentBlock}>
                <div className={classes.ImageContainer}>
                    <img className={classes.Image} alt='Newsletter'
                         src={newsletterImage}/>
                </div>
                <div className={classes.Content}>
                    <div className={classes.Title}>
                        Security Settings
                    </div>
                    <div className={classes.Text}>
                        Easily change your password here to keep your account secure and prevent unauthorized access.
                    </div>
                    <div className={classes.ButtonContainer}>
                        <button onClick={popupBoard} className={classes.Button}>
                            Change
                        </button>
                    </div>
                </div>
            </section>
            {
                authCtx.user.role === roles.ADMIN &&
                <section className={classes.ContentBlock}>
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
                             src={myChildren}/>
                    </div>
                </section>
            }
            {isChanging &&
                <Backdrop>
                    <ChangePassword onCancel={cancelChange}/>
                </Backdrop>
            }
        </div>
    );
};

export default AccountPage;
