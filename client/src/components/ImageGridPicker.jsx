import React, {useRef, useState} from 'react';
import classes from '../style/ImageGridPicker.module.css'
import Button from "./Button.jsx";
import Notification from "./Notification.jsx";

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
                setNotifyMessage(`Image "${f.name}" has been ignored, because the size exceed ${maxMB}MB.`);
                continue;
            }

            try {
                const blob = await makeThumbnail(file, maxW, maxH, 'image/webp', 0.85);
                const dataUrl = await blobToDataURL(blob);
                const img = await loadImage(dataUrl);
                added.push({
                    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
                    dataUrl,
                    blob,
                    fileName: file.name,
                    width: img.width,
                    height: img.height,
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
        // console.log(e)
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

    const handleCancel = ()=>{
        setNotify(false);
        setNotifyMessage('');
    }

    return (
        <div style={{display: 'grid', gap: 12}}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8}}>
                <label
                    style={{
                        padding: '6px 12px',
                        border: '1px solid #ddd',
                        borderRadius: 8,
                        cursor: images.length >= maxCount ? 'not-allowed' : 'pointer',
                        opacity: images.length >= maxCount ? 0.6 : 1,
                    }}
                >
                    Select Images
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={onPick}
                        style={{display: 'none'}}
                        disabled={images.length >= maxCount}
                    />
                </label>
                <div style={{color: '#666'}}>{images.length} / {maxCount}</div>
            </div>

            <div className={classes.ImagesContainer}>
                {images.map((img, i) => (
                    <figure
                        key={img.id}
                        draggable
                        onDragStart={() => onDragStart(i)}
                        onDragOver={onDragOver}
                        onDrop={() => onDrop(i)}
                        style={{
                            position: 'relative',
                            margin: 0,
                            aspectRatio: '1 / 1',
                            border: '1px solid #eee',
                            borderRadius: 12,
                            overflow: 'hidden',
                            background: '#fafafa',
                        }}
                        title="Drag to change order"
                    >
                        <img
                            src={img.dataUrl}
                            alt=""
                            style={{width: '100%', height: '100%', objectFit: 'cover'}}
                        />
                        <div className={classes.ButtonContainer}>
                            <Button handleClick={() => removeAt(i)} name={'Delete'}/>
                        </div>
                    </figure>
                ))}

                {/* empty slots */}
                {Array.from({length: Math.max(0, maxCount - images.length)}).map((_, idx) => (
                    <div
                        key={`placeholder-${idx}`}
                        style={{
                            aspectRatio: '1 / 1',
                            border: '1px dashed #ddd',
                            borderRadius: 12,
                            background: '#fff',
                        }}
                    />
                ))}
            </div>
            {
                notify && <Notification message={notifyMessage} onClick={handleCancel} enableIcon={true}/>
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

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

function canvasToBlob(canvas, type, quality) {
    return new Promise((resolve) => canvas.toBlob((b) => resolve(b), type, quality));
}

async function makeThumbnail(file, maxW, maxH, mime = 'image/webp', quality = 0.85) {
    const dataUrl = await readAsDataURL(file);
    const img = await loadImage(dataUrl);
    const scale = Math.min(maxW / img.width, maxH / img.height, 1);
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, w, h);
    const blob = await canvasToBlob(canvas, mime, quality);
    if (blob && blob.size > 0) return blob;
    return await canvasToBlob(canvas, 'image/jpeg', quality);
}

const blobToDataURL = (b) =>{
    return new Promise((res) => {
        const r = new FileReader();
        r.onload = () => res(String(r.result));
        r.readAsDataURL(b);
    });
}
