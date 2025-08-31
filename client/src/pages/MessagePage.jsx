import React, {useCallback, useContext, useEffect, useState} from 'react';
import classes from '../style/MessagePage.module.css'
import {addMessage, fetchMessages} from "../api/messages.js";
import {useLocation} from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import {fetchUsers} from "../api/adminOperation.js";
import {deleteUserById} from "../api/manageUsers.js";

const MessagePage = () => {
    const [content, setContent] = useState('');
    const {state} = useLocation();
    const authCtx = useContext(AuthContext);

    const [pageIndex, setPageIndex] = useState(0);
    const [itemNum, setItemNum] = useState(10);
    const [orderBy, setOrderBy] = useState({createdAt: 'desc'});
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    const [disablePrev, setDisablePrev] = useState(true);
    const [disableNext, setDisableNext] = useState(false);

    const loadMessages = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await fetchMessages(pageIndex, itemNum, orderBy, state?.id);

            console.log(res)

            const arr = res.data?.data ?? [];

            setMessages(arr.slice(0, itemNum));

            setDisablePrev(pageIndex === 0);
            setDisableNext(arr.length <= itemNum);
        } catch (e) {
            console.log(e);
        } finally {
            setIsLoading(false);
        }
    }, [pageIndex, itemNum, orderBy]);

    useEffect(() => {
        loadMessages();
    }, [loadMessages]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            return
        }

        try {
            const newContent = {
                content,
                childId: state?.id,
                senderId: authCtx.user.id
            }
            const res = await addMessage(newContent);
            console.log(res);
            setContent('');
            await loadMessages();
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={classes.Container}>
            <div className={classes.Title}>
                Messages to {state?.name}'s Parent
            </div>
            <form onSubmit={handleSubmit} className={classes.FormContainer}>
                <textarea
                    placeholder={'Message content...'}
                    value={content}
                    onChange={(e) => {
                        setContent(e.target.value)
                    }}
                    className={classes.TextArea}></textarea>
                <button className={classes.Button}>Send</button>
            </form>
            <div className={classes.MessageContainer}>
                {
                    messages && messages.map((item) => {
                        const flag = item.senderId === authCtx.user.id
                        const tempTime = new Date(item.createdAt);
                        const time = tempTime.toLocaleTimeString('en-NZ', {
                            hour12: false,
                            hour: '2-digit', minute: '2-digit', second: '2-digit',
                        });
                        const date = tempTime.toLocaleDateString('en-NZ', {
                            year: 'numeric', month: '2-digit', day: '2-digit',
                        });

                        return (
                            <>
                                <div className={flag ? classes.RightMessage : classes.LeftMessage}>
                                    <div>
                                        {item.content}
                                    </div>
                                    <div className={classes.CreateTime}>
                                        {time + ' ' + date}
                                    </div>
                                </div>
                            </>

                        )
                    })
                }
                <div className={classes.ListFunction}>
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
            </div>
        </div>
    );
};

export default MessagePage;
