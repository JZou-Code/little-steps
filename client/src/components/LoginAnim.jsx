import React from 'react';
import classes from '../style/LoginAnimi.module.css'

const LoginAnim = () => {
    return (
        <div className={classes.Container}>
            <img
                className={`${classes.Slide} ${classes.Slide1}`}
                src='../../public/images/animation-images/cover1.jpg'
                alt='animate-img-1'/>
            <img
                className={`${classes.Slide} ${classes.Slide2}`}
                src='../../public/images/animation-images/cover2.jpg'
                alt='animate-img-1'/>
            <img
                className={`${classes.Slide} ${classes.Slide3}`}
                src='../../public/images/animation-images/cover3.jpg'
                alt='animate-img-1'/>
        </div>
    );
};

export default LoginAnim;