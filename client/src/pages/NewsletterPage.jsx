import React from 'react';
import classes from '../style/NewsletterPage.module.css'
import Button from "../components/Button.jsx";
import {useNavigate} from "react-router-dom";
import NewsletterBlock from "../components/NewsletterBlock.jsx";

const NewsletterPage = () => {
    const navigate = useNavigate();
    const handleClick=()=>{
        navigate('/newsletter/create-new')
    }

    return (
        <div className={classes.Container}>
            <div className={classes.TopSection}>
                <div className={classes.TopTitle}>
                    Newsletter
                </div>
                <div className={classes.Create}>
                    <Button handleClick={handleClick} name={'New Post'}/>
                </div>
            </div>
            <NewsletterBlock/>
            {/*<div className={classes.ListFunction}>*/}
            {/*    <button*/}
            {/*        onClick={handlePrev}*/}
            {/*        className={disablePrev ? `${classes.Button} ${classes.Disabled}` : classes.Button}>*/}
            {/*        Previous*/}
            {/*    </button>*/}
            {/*    <button*/}
            {/*        onClick={handleNext}*/}
            {/*        className={disableNext ? `${classes.Button} ${classes.Disabled}` : classes.Button}>*/}
            {/*        Next*/}
            {/*    </button>*/}
            {/*</div>*/}
        </div>
    );
};

export default NewsletterPage;
