import React, {useCallback, useEffect, useState} from 'react';
import classes from '../style/NewsletterPage.module.css'
import Button from "../components/Button.jsx";
import {useNavigate} from "react-router-dom";
import NewsletterBlock from "../components/NewsletterBlock.jsx";
import {fetchNewsletters} from "../api/manageNewsletter.js";
import Notification from "../components/Notification.jsx";

const NewsletterPage = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [itemNum, setItemNum] = useState(10);
    const [orderBy, setOrderBy] = useState({createdAt: 'desc'});
    const [newsletters, setNewsletters] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/newsletter/create-new')
    }

    const [disablePrev, setDisablePrev] = useState(true);
    const [disableNext, setDisableNext] = useState(false);

    const loadNewsletters = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await fetchNewsletters(pageIndex, itemNum, orderBy);
            console.log(res)
            const arr = res.data?.data ?? [];
            setNewsletters(arr.slice(0, itemNum))

            setDisablePrev(pageIndex === 0);
            setDisableNext(arr.length <= itemNum);
        } catch (e) {
            console.log(e);
            setIsError(true)
        } finally {
            setIsLoading(false);
        }
    }, [pageIndex, itemNum, orderBy]);

    useEffect(() => {
        loadNewsletters();
    }, [loadNewsletters]);

    const handlePrev = () => {
        setDisableNext(false);
        if (pageIndex < itemNum) {
            return
        }
        setPageIndex(pageIndex - itemNum);

        if (pageIndex <= itemNum) {
            setDisablePrev(true);
        }
    }

    const handleNext = () => {
        setDisablePrev(false);
        setPageIndex(pageIndex + itemNum)
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
            {
                newsletters.map(item =>
                    <NewsletterBlock key={item.id} data={item}/>
                )
            }
            <div className={classes.ButtonContainer}>
                <button
                    onClick={handlePrev}
                    className={disablePrev ? `${classes.Button} ${classes.Disabled}` : classes.Button}>
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className={disableNext ? `${classes.Button} ${classes.Disabled}` : classes.Button}>
                    Next
                </button>
            </div>
            {
                isLoading && <Notification enableIcon={false} message={'Loading...'}/>
            }
            {
                isError && <Notification enableIcon={true} message={'Something went wrong'} onClick={()=>{setIsError(false)}}/>
            }
        </div>
    );
};

export default NewsletterPage;
