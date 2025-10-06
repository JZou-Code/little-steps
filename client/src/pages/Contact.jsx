import React from 'react';
import classes from '../style/ContactPage.module.css'
import draw from '../assets/contactpage/draw.jpg'
import message from '../assets/contactpage/message.jpg'
import room from '../assets/contactpage/room.jpg'

const Contact = () => {
    return (
        <div className={classes.Container}>
            <section className={classes.ContentBlock}>
                <div className={classes.ImageContainer}>
                    <img className={classes.Image} alt='Newsletter'
                         src={message}/>
                </div>
                <div className={classes.Content}>
                    <div className={classes.Title}>
                        Contact
                    </div>
                    <div className={classes.Text}>
                        <ul>
                            <li>
                                <div>
                                    <strong>Phone:</strong>
                                </div>
                                <div>
                                    +64 (0)X XXX XXXX
                                </div>
                            </li>
                            <li>
                                <div>
                                    <strong>Email:</strong>
                                </div>
                                <div>
                                    hello@littlesteps.com
                                </div>
                            </li>
                            <li>
                                <div>
                                    <strong>Address:</strong>
                                </div>
                                <div>
                                    123 Sample Street, Hamilton, Waikato, New Zealand
                                </div>
                            </li>
                            <li>
                                <div>
                                    <strong>Open hours:</strong>
                                </div>
                                <div>
                                    Mon–Fri 7:30am–5:30pm (closed public holidays)
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className={classes.ContentBlock}>
                <div className={classes.ImageContainer}>
                    <img className={classes.Image} alt='Newsletter'
                         src={room}/>
                </div>
                <div className={classes.Content}>
                    <div className={classes.Title}>
                        Book a visit
                    </div>
                    <div className={classes.Text}>
                        Schedule a 20–30 minute tour to meet our teachers, explore learning spaces, and discuss your
                        child’s needs. We offer morning and afternoon slots.
                    </div>

                </div>
            </section>

            <section className={classes.ContentBlock}>
                <div className={classes.ImageContainer}>
                    <img className={classes.Image} alt='Newsletter'
                         src={draw}/>
                </div>
                <div className={classes.Content}>
                    <div className={classes.Title}>
                        Careers & volunteering
                    </div>
                    <div className={classes.Text}>
                        Interested in joining our team or volunteering? Send your CV or a short intro to
                        &nbsp;<strong>careers@littlesteps.nz</strong>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default Contact;
