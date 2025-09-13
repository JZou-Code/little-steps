import React, {useState} from 'react';
import classes from "../style/NewsletterPage.module.css";
import Button from "./Button.jsx";
import CommentBlock from "./CommentBlock.jsx";


const Comment = () => {
    const [isReply, setIsReply] = useState(false);
    const [isReplyTo, setIsReplyTo] = useState(false);
    const [replyTo, setReplyTo] = useState(null);

    const [content, setContent] = useState('')

    const handleSubmit = () => {

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
                            onChange={e=>{setContent(e.target.value)}}
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
        </>
    );
};

export default Comment;
