import React, {useContext, useState} from 'react';
import classes from "../style/NewsletterPage.module.css";
import Button from "./Button.jsx";
import CommentBlock from "./CommentBlock.jsx";
import {createComment} from "../api/manageComment.js";
import AuthContext from "../context/AuthContext.jsx";
import Notification from "./Notification.jsx";


const Comment = (props) => {
    const [isReply, setIsReply] = useState(false);
    const [isReplyTo, setIsReplyTo] = useState(false);
    const [replyTo, setReplyTo] = useState(null);

    const [processing, setProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [content, setContent] = useState('')

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

            console.log(data)

            if (data.code === 200 || data.code === '200') {
                setContent('')
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

    return (
        <>
            <div className={classes.ReplyContainer}>
                <Button name={'Reply'} handleClick={() => setIsReply(true)}/>
            </div>
            <div className={classes.CommentContainer}>
                <CommentBlock/>
            </div>
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
                        <Button name={'Cancel'} handleClick={() => {
                            setIsReply(false)
                        }}/>
                    </div>
                </div>
            }
            {
                isError && <Notification enableIcon={true} message={'Something went wrong'} onClick={() => {
                    setIsError(false)
                }}/>
            }
            {
                processing && <Notification enableIcon={false} message={'Processing...'}/>
            }
        </>
    );
};

export default Comment;
