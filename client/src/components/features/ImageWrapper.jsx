import React from 'react';
import Backdrop from "../../UI/Backdrop/Backdrop.jsx";
import classes from '../../style/ImageWrapper.module.css'

const ImageWrapper = ({src}) => {
    return (
        <Backdrop>
            <div className={classes.Container}>
                <img className={classes.Image} src={src} alt={'detailed image'}/>
            </div>
        </Backdrop>
    );
};

export default ImageWrapper;
