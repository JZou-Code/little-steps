import React from 'react';
import classes from '../style/CommentBlock.module.css'

const CommentBlock = () => {
    return (
        <div className={classes.Container}>
            <div className={classes.Top}>
                <div className={classes.Name}>
                    Jack Jones:
                </div>
                <div className={classes.CreatedAt}>
                    13/09/2025, 23:26:03
                </div>
            </div>
            <div className={classes.Content}>
                Hello World
            </div>
        </div>
    );
};

export default CommentBlock;
