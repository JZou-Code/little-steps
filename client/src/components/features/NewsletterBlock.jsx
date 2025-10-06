import React, {useEffect, useState} from 'react';
import classes from '../../style/NewsletterPage.module.css'
import DOMPurify from 'dompurify';
import Comment from "./Comment.jsx";
import {convertTime} from "../../utils/convertTime.js";
import ImageWrapper from "./ImageWrapper.jsx";

const NewsletterBlock = ({data}) => {
    const [time, setTime] = useState(data.updatedAt);
    const [container, setContainer] = useState('');
    const [open, setOpen] = useState(false);
    const [src, setSrc] = useState('')

    const RichHtml = ({html}) => {
        const safe = DOMPurify.sanitize(html);
        return (
            <div
                className="prose"
                dangerouslySetInnerHTML={{__html: safe}}
            />
        );
    }

    const selectContainer = () => {
        const num = data.ArticleImage.length
        switch (num) {
            case 1:
                setContainer(`${classes.ImagesContainer} ${classes.Images_1Image}`);
                break;
            case 2:
                setContainer(`${classes.ImagesContainer} ${classes.Images_2or4Images}`);
                break;
            case 4:
                setContainer(`${classes.ImagesContainer} ${classes.Images_2or4Images}`);
                break;
            default:
                setContainer(`${classes.ImagesContainer} ${classes.Images_3or5orMore}`);
                break;
        }
    }

    const viewDetailedImage = (src) => {
        setSrc(src);
        setOpen(true);
    }

    useEffect(() => {
        setTime(convertTime(time, {second: '2-digit'}));
        selectContainer();
    }, []);

    return (
        <div className={classes.ItemContainer}>
            <div className={classes.ArticleContainer}>
                <div className={classes.Top}>
                    <div className={classes.Title}>
                        {data.title}
                    </div>
                    <div className={classes.TopInfo}>
                        Last Edited at {time}
                    </div>
                </div>
                <div className={container}>
                    {
                        data.ArticleImage.map(item =>
                            <div key={item.id} className={classes.ImageWrapper}>
                                <img
                                    onClick={() => {
                                        viewDetailedImage(`https://d1xw2ny1uxkw0s.cloudfront.net/${item.storageKey}`)
                                    }}
                                    className={classes.Image}
                                    src={`https://d1xw2ny1uxkw0s.cloudfront.net/${item.storageKey}`}
                                    alt='article images'/>
                            </div>
                        )
                    }
                </div>
                <article className={classes.Article}>
                    <RichHtml html={data.content}/>
                </article>
            </div>
            <Comment newsletterId={data.id}/>
            {
                open &&
                <div onClick={()=>{setOpen(false)}}>
                    <ImageWrapper src={src}/>
                </div>
            }
        </div>
    );
};

export default NewsletterBlock;
