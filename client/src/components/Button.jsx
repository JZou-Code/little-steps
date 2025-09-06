import React from 'react';
import classes from '../style/Button.module.css'

const Button = (props) => {
    return (
        <button className={classes.Button} onClick={props.handleClick} style={props.style}>
            {props.name}
        </button>
    );
};

export default Button;
