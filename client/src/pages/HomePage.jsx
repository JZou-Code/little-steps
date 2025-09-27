import React, {useEffect, useState} from 'react';
import classes from '../style/HomePage.module.css'
import {useLocation, useNavigate} from "react-router-dom";
import overallTop from '../assets/homepage/overallTop.jpg'
import overallBot from '../assets/homepage/overallBot.jpg'
import reason1 from '../assets/homepage/reason-1.jpg'
import reason2 from '../assets/homepage/reason-2.jpg'
import reason3 from '../assets/homepage/reason-3.jpg'
import ErrorNotification from "../components/ErrorNotification.jsx";


const HomePage = () => {
    const [noPermission, setNoPermission] = useState(false);

    const navigate = useNavigate();
    const {state} = useLocation();

    useEffect(() => {
        if (state?.noPermission){
            setNoPermission(true);
        }
    }, [setNoPermission]);

    return (
        <div className={classes.Container}>
            <section className={classes.Overall}>
                <div className={classes.OverallTop}>
                    <div className={classes.OverallTitle}>
                        Discover Little Steps in Hamilton today
                    </div>
                    <div className={classes.ImageContainer}>
                        <img className={classes.OverallImgTop} src={overallTop}
                             alt='overall image top'/>
                    </div>
                </div>

                <div className={classes.OverallBot}>
                    <div className={classes.ImageContainer}>
                        <img className={classes.OverallImgBot} src={overallBot}
                             alt='overall image bottom'/>
                    </div>
                    <div className={classes.OverallText}>
                        At Little Steps in Hamilton, we engage young minds in a lively and nurturing environment. Our
                        Early Childhood Hamilton centre blends play with learning, making each day a delightful journey
                        for your child.
                    </div>
                </div>
            </section>

            <section className={classes.Reason}>
                <div className={classes.ReasonImgs}>
                    <img className={classes.ReasonImg} src={reason1}
                         alt='Why pick us'/>
                    <img className={classes.ReasonImg} src={reason2}
                         alt='Why pick us'/>
                    <img className={classes.ReasonImg} src={reason3}
                         alt='Why pick us'/>
                </div>
                <div className={classes.ReasonContent}>
                    <div className={classes.ReasonTitle}>
                        Why families pick us
                    </div>
                    <div className={classes.ReasonText}>
                        <ul>
                            <li>Creative Activities</li>
                            <li>Heartfelt Support</li>
                            <li>Individualised Attention</li>
                        </ul>
                        <ul>
                            <li>Joyful Growth</li>
                            <li>Community Engagement</li>
                            <li>Convenient Hamilton Location</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className={classes.About}>
                <div className={classes.ImageContainer}>
                    <img className={classes.OverallImgBot} src={overallBot}
                         alt='overall image bottom'/>
                </div>
                <div className={classes.AboutContent}>
                    <div className={classes.AboutTitle}>
                        About Little Steps
                    </div>
                    <div className={classes.AboutText}>
                        At Little Steps, we are dedicated to offering a warm, creative, and supportive environment where
                        young minds can flourish. Every family’s story is unique, and we’re here to guide you on these
                        early
                        childhood steps in Hamilton.
                    </div>
                    <div className={classes.ButtonContainer}>
                        <button onClick={()=>{navigate('/contact')}} className={classes.Button}>
                            About Us
                        </button>
                    </div>
                </div>
            </section>
            {
                noPermission && <ErrorNotification message={'Insufficient permissions. You can’t access this page.'} onClick={()=>{setNoPermission(false)}}/>
            }
        </div>
    );
};

export default HomePage;
