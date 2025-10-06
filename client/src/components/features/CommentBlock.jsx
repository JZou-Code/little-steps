import React, {useEffect, useState} from 'react';
import classes from '../../style/CommentBlock.module.css'
import {convertTime} from "../../utils/convertTime.js";

/**
 * CommentBlock component that displays individual comment information
 * Shows comment author, timestamp, and content
 * Formats timestamp for display
 * 
 * @param {Object} props - Component props
 * @param {Object} props.data - Comment data
 * @param {Object} props.data.author - Comment author information
 * @param {string} props.data.content - Comment content
 * @param {string} props.data.createdAt - Comment creation timestamp
 * @returns {JSX.Element} The comment block component
 */
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
