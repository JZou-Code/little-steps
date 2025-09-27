import React, {useContext, useState} from 'react';
import classes from '../style/CreateNewsletterPage.module.css'
import TinyMCE from "../components/TinyMCE.jsx";
import Button from "../components/Button.jsx";
import {useNavigate} from "react-router-dom";
import ImageGridPicker from "../components/ImageGridPicker.jsx";
import {createNewsletter} from "../api/manageNewsletter.js";
import AuthContext from "../context/AuthContext.jsx";
import OtherNotification from "../components/OtherNotification.jsx";
import ErrorNotification from "../components/ErrorNotification.jsx";

const CreateNewsletterPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);

    const [processing, setProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const authCtx = useContext(AuthContext);

    const navigate = useNavigate();

    const handleChange = (html) => {
        setContent(html)
    }

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            setIsEmpty(true);
            return;
        }

        try {
            setProcessing(true);
            const formData = new FormData();
            for (const img of images) {
                formData.append('files[]', img.file, img.file?.name)
            }
            formData.append('authorId', String(authCtx.user.id));
            formData.append('title', title);
            formData.append('content', content);
            const {data} = await createNewsletter(formData)

            console.log(data)

            if (data.code === 200 || data.code === '200') {
                navigate('/newsletter')
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
        const flag = confirm('Confirm to leave this page? The content wouldn\'t be saved.');

        if (flag) {
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
            {
                processing && <OtherNotification message={'Processing...'}/>
            }
            {
                isEmpty && <ErrorNotification message={'Title and Content required'} onClick={() => {
                    setIsEmpty(false)
                }}/>
            }
            {
                isError && <ErrorNotification message={'Something went wrong'} onClick={() => {
                    setIsError(false)
                }}/>
            }
        </div>
    );
};

export default CreateNewsletterPage;
