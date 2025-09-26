import React from 'react';
import classes from '../style/Footer.module.css'
import logo from "../assets/logo/logo.jpg";
import {useNavigate} from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className={classes.Background}>
            <div className={classes.Container}>
                <section className={classes.LogoContainer}>
                    <div className={classes.LogoWrapper}>
                        <img className={classes.Logo} src={logo} alt={'logo'}/>
                    </div>
                    <div className={classes.LogoText}>
                        A warm, play-based early childhood centre in Hamilton, where learning happens through curiosity, care, and joyful exploration.
                    </div>
                </section>
                <section className={classes.ContentContainer}>
                    <div className={classes.ContentTitle}>
                        Contact
                    </div>
                    <div className={classes.Contact}>
                        <div>Phone: +64 (0)X XXX XXXX</div>
                        <div>Email: hello@littlesteps.com</div>
                        <div>Address: 123 Sample Street, Hamilton, Waikato, New Zealand</div>
                        <div>Open hours: Mon–Fri 7:30am–5:30pm (closed public holidays)</div>
                    </div>
                </section>
                <section className={classes.ContentContainer}>
                    <div className={classes.ContentTitle}>
                        Quick links
                    </div>
                    <div className={classes.Content}>
                        <ul>
                            <li className={classes.Link} onClick={()=>{navigate('/')}}>Home</li>
                            <li className={classes.Link} onClick={()=>{navigate('/gallery')}}>Gallery</li>
                            <li className={classes.Link} onClick={()=>{navigate('/contact')}}>Contact</li>
                            <li className={classes.Link} onClick={()=>{navigate('/newsletter')}}>Newsletter</li>
                            <li className={classes.Link} onClick={()=>{navigate('/account')}}>Account</li>
                        </ul>
                    </div>
                </section>
                <section className={classes.ContentContainer}>
                    <div className={classes.ContentTitle}>
                        Careers & volunteering
                    </div>
                    <div className={classes.Content}>
                        Send email to us: <br/>
                        career@example.nz
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Footer;
