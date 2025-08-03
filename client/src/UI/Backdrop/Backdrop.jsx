import React from 'react';
import classes from './Backdrop.module.css'
import ReactDOM from 'react-dom';

const backdropRoot = document.querySelector('#modal-root');

const Backdrop = (props) => {
    return ReactDOM.createPortal(<div
        className={`${classes.Backdrop}`}>
        {props.children}
    </div>, backdropRoot)
};

export default Backdrop;