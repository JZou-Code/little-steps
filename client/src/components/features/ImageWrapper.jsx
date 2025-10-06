import React from 'react';
import Backdrop from "../../UI/Backdrop/Backdrop.jsx";
import classes from '../../style/ImageWrapper.module.css'

/**
 * ImageWrapper component that displays images in a modal overlay
 * Uses backdrop component for modal display
 * Shows detailed image view with proper styling
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @returns {JSX.Element} The image wrapper component with backdrop
 */
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
