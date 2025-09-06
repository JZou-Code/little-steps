import React, {useState} from 'react';
import classes from '../style/CreateNewsletterPage.module.css'
import TinyMCE from "../components/TinyMCE.jsx";

const CreateNewsletterPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleChange = (html) => {
        setContent(html)
    }

    return (
        <div className={classes.Container}>
            <div className={classes.TitleContainer}>
                <input
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    placeholder={'Title...'}
                    className={classes.TitleInput}/>
            </div>
            <div className={classes.ImageContainer}>

            </div>
            <div className={classes.BodyContainer}>
                <TinyMCE content={content} onChange={handleChange}/>
            </div>
            <div className={classes.ButtonContainer}>

            </div>
        </div>
    );
};

export default CreateNewsletterPage;
