import React, {useState} from 'react';
import classes from '../style/CreateNewsletterPage.module.css'
import TinyMCE from "../components/TinyMCE.jsx";
import Button from "../components/Button.jsx";
import {useNavigate} from "react-router-dom";
import ImageGridPicker from "../components/ImageGridPicker.jsx";

const CreateNewsletterPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);

    const navigate = useNavigate();

    const handleChange = (html) => {
        setContent(html)
    }

    const handleSubmit = () => {
        console.log(images)
        console.log('handle submit')
    }

    const handleCancel = () => {
        const flag = confirm('Confirm to leave this page? The content wouldn\'t be saved.');

        if (flag){
            navigate('/newsletter');
        }
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
                <ImageGridPicker onChange={setImages}/>
            </div>
            <div className={classes.BodyContainer}>
                <TinyMCE content={content} onChange={handleChange}/>
            </div>
            <div className={classes.ButtonContainer}>
                <Button handleClick={handleSubmit} name={'Submit'}/>
                <Button handleClick={handleCancel} name={'Cancel'}/>
            </div>
        </div>
    );
};

export default CreateNewsletterPage;
