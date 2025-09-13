import React, {useEffect, useState} from 'react';
import classes from '../style/NewsletterPage.module.css'
import DOMPurify from 'dompurify';

const NewsletterBlock = ({data}) => {
    const [time, setTime] = useState(data.updatedAt);
    const [container, setContainer] = useState('');

    const convertTime = (iso, opts = {}) => {
        return new Intl.DateTimeFormat('en-NZ', {
            timeZone: 'Pacific/Auckland',
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit',
            hour12: false,
            ...opts,
        }).format(new Date(iso));
    }

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
                            <div className={classes.ImageWrapper}>
                                <img
                                    key={item.id}
                                    className={classes.Image}
                                    src={`/api/images/temp/${item.storageKey}`}
                                    alt='overall image bottom'/>
                            </div>
                        )
                    }
                </div>
                <article className={classes.Article}>
                    <RichHtml html={data.content}/>
                </article>
            </div>
            <div className={classes.CommentContainer}>

            </div>
        </div>
    );
};

export default NewsletterBlock;
