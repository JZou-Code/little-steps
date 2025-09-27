import React, {useCallback, useContext, useEffect, useState} from 'react';
import classes from "../style/NewsletterPage.module.css";
import Button from "./Button.jsx";
import CommentBlock from "./CommentBlock.jsx";
import {createComment, fetchComments} from "../api/manageComment.js";
import AuthContext from "../context/AuthContext.jsx";
import ErrorNotification from "./ErrorNotification.jsx";
import OtherNotification from "./OtherNotification.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight} from "@fortawesome/free-solid-svg-icons";

const Comment = (props) => {
    const [isReply, setIsReply] = useState(false);
    const [isReplyTo, setIsReplyTo] = useState(false);
    const [replyTo, setReplyTo] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [content, setContent] = useState('')
    const [pageIndex, setPageIndex] = useState(0);
    const [itemNum, setItemNum] = useState(10);
    const [orderBy, setOrderBy] = useState({createdAt: 'asc'});
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [disablePrev, setDisablePrev] = useState(true);
    const [disableNext, setDisableNext] = useState(false);
    const [isEmpty, setIsEmpty] = useState(true);

    const loadComments = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await fetchComments(pageIndex, itemNum, orderBy, props.newsletterId);
            const arr = res.data?.data ?? [];
            setComments(arr.slice(0, itemNum))

            if (res.data?.data?.length !== 0) {
                setIsEmpty(false)
            }

            console.log(res)

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
        loadComments();
    }, [loadComments]);

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

    const authCtx = useContext(AuthContext);

    const handleSubmit = async () => {
        if (!content.trim()) {
            return;
        }

        try {
            setProcessing(true);
            const {data} = await createComment({
                authorId: authCtx.user.id,
                newsletterId: props.newsletterId,
                content
            })

            if (data.code === 200 || data.code === '200') {
                setContent('')
                await loadComments();
            } else {
                setIsError(true);
            }
        } catch (e) {
            console.log(e)
            setIsError(true);
        } finally {
            setProcessing(false);
        }
    }

    const handleCancel = () => {
        setIsReply(false);
        setContent('')
    }

    return (
        <>
            <div className={classes.ReplyContainer}>
                <Button name={'Reply'} handleClick={() => setIsReply(true)}/>
            </div>
            {
                !isEmpty &&
                <div className={classes.CommentContainer}>
                    {
                        comments.map(item => <CommentBlock key={item.id} data={item}/>)
                    }

                    <div style={{fontSize: '0.8rem'}} className={classes.ButtonContainer}>
                        <FontAwesomeIcon
                            icon={faAngleLeft}
                            className={disablePrev ? `${classes.IconButton} ${classes.IconDisabled}` : classes.IconButton}
                            onClick={handlePrev}/>
                        <FontAwesomeIcon
                            icon={faAngleRight}
                            className={disableNext ? `${classes.IconButton} ${classes.IconDisabled}` : classes.IconButton}
                            onClick={handleNext}/>
                    </div>

                </div>
            }
            {
                isReply &&
                <div className={classes.CommentEditor}>
                    <div className={classes.ContentArea}>
                        {
                            isReplyTo &&
                            <div className={classes.ReplyTo}>
                                Reply to {replyTo.user} :
                            </div>
                        }
                        <textarea
                            value={content}
                            onChange={e => {
                                setContent(e.target.value)
                            }}
                            className={classes.TextArea}/>
                    </div>
                    <div className={classes.CommentButtons}>
                        <Button name={'Submit'} handleClick={handleSubmit}/>
                        <Button name={'Cancel'} handleClick={handleCancel}/>
                    </div>
                </div>
            }
            {
                isError && <ErrorNotification message={'Something went wrong'} onClick={() => {
                    setIsError(false)
                }}/>
            }
            {
                processing && <OtherNotification message={'Processing...'}/>
            }
            {
                isLoading && <OtherNotification message={'Loading...'}/>
            }
        </>
    );
};

export default Comment;
