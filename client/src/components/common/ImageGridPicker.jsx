import React, {useRef, useState} from 'react';
import classes from '../../style/ImageGridPicker.module.css'
import Button from "./Button.jsx";
import ErrorNotification from "./notifications/ErrorNotification.jsx";

export default function ImageGridPicker({
                                            maxCount = 9,
                                            maxMB = 1, // Max size
                                            maxW = 1600,
                                            maxH = 1200,
                                            onChange,           // (images) => void；images: [{id,dataUrl,blob,fileName,width,height}]
                                        }) {
    const [images, setImages] = useState([]);
    const [notify, setNotify] = useState(false);
    const [notifyMessage, setNotifyMessage] = useState('');
    const dragIndexRef = useRef(null);

    const emit = (arr) => {
        setImages(arr);
        onChange?.(arr);
    };

    const onPick = async (e) => {
        const files = Array.from(e.target.files || []);

        e.target.value = '';
        if (!files.length) {
            return
        }

        const remain = Math.max(0, maxCount - images.length);
        const take = files.slice(0, remain);

        const added = [];
        for (const file of take) {
            if (!file.type.startsWith('image/')) {
                setNotify(true);
                setNotifyMessage(`File "${file.name}" is not an image.`);
                continue
            }

            if (file.size > maxMB * 1024 * 1024) {
                setNotify(true);
                setNotifyMessage(`Image "${file.name}" has been ignored, because the size exceed ${maxMB}MB.`);
                continue;
            }

            try {
                const imageUrl = await readAsDataURL(file);
                added.push({
                    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                    imageUrl,
                    file,
                });
            } catch (err) {
                console.log(`Handle ${file.name} failed：${err?.message || err}`);
                setNotify(true);
                setNotifyMessage(`Handle "${file.name}" failed：${err?.message || err}.`);
            }
        }

        if (added.length) {
            emit([...images, ...added])
        }
    };

    const removeAt = (i) => {
        emit(images.filter((_, idx) => idx !== i))
    };

    // drag to change order
    const onDragStart = (i) => {
        console.log(i)
        dragIndexRef.current = i
    };
    const onDragOver = (e) => {
        e.preventDefault()
    };
    const onDrop = (i) => {
        console.log(i)
        const from = dragIndexRef.current;
        if (from === null || from === i) {
            return
        }
        const arr = images.slice();
        const [moved] = arr.splice(from, 1);
        arr.splice(i, 0, moved);
        dragIndexRef.current = null;
        emit(arr);
    };

    const handleCancel = () => {
        setNotify(false);
        setNotifyMessage('');
    }

    return (
        <div className={classes.Container}>
            <div className={classes.Select}>
                <label
                    className={images.length >= maxCount ? `${classes.Label} ${classes.SelectDisabled}` : classes.Label}>
                    Select Images
                    <input
                        type="file"
                        className={classes.SelectInput}
                        accept="image/*"
                        multiple
                        onChange={onPick}
                        disabled={images.length >= maxCount}
                    />
                </label>
                <div className={classes.Count}>{images.length} / {maxCount}</div>
            </div>

            <div className={classes.ImagesContainer}>
                {images.map((img, i) => (
                    <figure
                        key={img.id}
                        className={classes.Figure}
                        draggable
                        onDragStart={() => onDragStart(i)}
                        onDragOver={onDragOver}
                        onDrop={() => onDrop(i)}
                        title="Drag to change order"
                    >
                        <img
                            className={classes.SingleImage}
                            src={img.imageUrl}
                            alt=""
                        />
                        <div className={classes.ButtonContainer}>
                            <Button handleClick={() => removeAt(i)} name={'Delete'}/>
                        </div>
                    </figure>
                ))}

                {/* empty slots */}
                {Array.from({length: Math.max(0, maxCount - images.length)}).map((_, idx) => (
                    <div className={classes.EmptySlot} key={`placeholder-${idx}`}></div>
                ))}
            </div>
            {
                notify && <ErrorNotification message={notifyMessage} onClick={handleCancel}/>
            }
        </div>
    );
}

function readAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(String(fileReader.result));
        fileReader.onerror = reject;
        fileReader.readAsDataURL(file);
    });
}
