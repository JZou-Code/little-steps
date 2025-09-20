import React from 'react';
import classes from '../style/LoginAnimi.module.css'
import cover1 from '../assets/animation-images/cover1.jpg'
import cover2 from '../assets/animation-images/cover2.jpg'
import cover3 from '../assets/animation-images/cover3.jpg'

const LoginAnim = () => {
    return (
        <div className={classes.Container}>
            <img
                className={`${classes.Slide} ${classes.Slide1}`}
                src={cover1}
                alt='animate-img-1'/>
            <img
                className={`${classes.Slide} ${classes.Slide2}`}
                src={cover2}
                alt='animate-img-1'/>
            <img
                className={`${classes.Slide} ${classes.Slide3}`}
                src={cover3}
                alt='animate-img-1'/>
        </div>
    );
};

export default LoginAnim;