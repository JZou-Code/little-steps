import React from 'react';
import classes from '../style/ChildMessage.module.css'
import ChildrenList from "../components/ChildrenList.jsx";

const ChildMessage = () => {
    return (
        <div className={classes.Container}>
            <ChildrenList/>
        </div>
    );
};

export default ChildMessage;
