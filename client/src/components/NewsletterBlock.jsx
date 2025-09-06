import React from 'react';
import classes from '../style/NewsletterPage.module.css'
import Button from "../components/Button.jsx";
import {useNavigate} from "react-router-dom";

const NewsletterPage = () => {

    return (

        <div className={classes.ItemContainer}>
            <div className={classes.ArticleContainer}>
                <div className={classes.Top}>
                    <div className={classes.Title}>
                        AAAsadasdsaddsa asdasd asdasd
                    </div>
                    <div className={classes.TopInfo}>
                        Last Edited at asdad asdasd asdasd
                    </div>
                </div>
                <div className={`${classes.ImagesContainer} ${classes.Images_1Image}`}>
                    <div className={classes.ImageWrapper}>
                        <img className={classes.Image} src='./public/images/homepage/overallBot.jpg'
                             alt='overall image bottom'/>
                    </div>
                </div>
                <article className={classes.Article}>
                    At Little Steps in Hamilton, we engage young minds in a lively and nurturing environment. Our
                    Early Childhood Hamilton centre blends play with learning, making each day a delightful journey
                    for your child.
                </article>
            </div>
            <div className={classes.CommentContainer}>

            </div>
        </div>
    );
};

export default NewsletterPage;
