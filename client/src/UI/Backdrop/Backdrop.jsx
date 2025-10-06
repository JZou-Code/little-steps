import React from 'react';
import classes from './Backdrop.module.css'
import ReactDOM from 'react-dom';

/**
 * Modal root element for portal rendering
 */
const backdropRoot = document.querySelector('#modal-root');

/**
 * Backdrop component that creates modal overlay using React portal
 * Renders children content in a modal root element
 * Provides backdrop styling for modal dialogs
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Content to render in backdrop
 * @returns {JSX.Element} The backdrop component with portal rendering
 */
const Backdrop = (props) => {
    return ReactDOM.createPortal(<div
        className={`${classes.Backdrop}`}>
        {props.children}
    </div>, backdropRoot)
};

export default Backdrop;