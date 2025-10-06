import React from 'react';
import classes from '../../style/Button.module.css'

/**
 * Reusable Button component for consistent styling across the application
 * Accepts click handler, style overrides, and button text as props
 * 
 * @param {Object} props - Component props
 * @param {Function} props.handleClick - Click event handler function
 * @param {string} props.name - Button text content
 * @param {Object} props.style - Optional inline styles
 * @returns {JSX.Element} The button component
 */
const Button = (props) => {
    return (
        <button className={classes.Button} onClick={props.handleClick} style={props.style}>
            {props.name}
        </button>
    );
};

export default Button;
