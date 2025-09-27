import React, {useEffect, useState} from 'react';
import classes from '../style/CommentBlock.module.css'
import {convertTime} from "../utils/convertTime.js";

const CommentBlock = ({data}) => {
    const [time, setTime] = useState(data.createdAt);
    useEffect(() => {
        setTime(convertTime(time, {second: '2-digit'}));
    }, []);

    return (
        <div className={classes.Container}>
            <div className={classes.Top}>
                <div className={classes.Name}>
                    {data.author?.firstName + ' ' + data.author?.lastName}:
                </div>
                <div className={classes.CreatedAt}>
                    {time}
                </div>
            </div>
            <div className={classes.Content}>
                {data.content}
            </div>
        </div>
    );
};

export default CommentBlock;
