import React from 'react';
import classes from '../style/AccountPage.module.css'

const AccountPage = () => {
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
                        <button className={classes.Button}>
                            Contact
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
