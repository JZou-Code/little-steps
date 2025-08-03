import {useState, useEffect, useRef} from 'react'
import QuizContext from "../context/QuizContext.jsx";

function formatMMSS(ms) {
    return new Date(ms + 999).toISOString().slice(14, 19)
}

export default function Timer({seconds = 10, onTimeOver}) {
    const [timeLeft, setTimeLeft] = useState(formatMMSS(seconds * 1000))
    const callbackRef = useRef(onTimeOver);

    useEffect(() => {
        callbackRef.current = onTimeOver;
    }, [onTimeOver]);


    useEffect(() => {
        const end = Date.now() + seconds * 1000
        const id = setInterval(() => {
            const left = end - Date.now()
            if (left <= 0) {
                setTimeLeft("00:00")
                clearInterval(id)
                callbackRef.current({isTimeOver: true});
            } else {
                setTimeLeft(formatMMSS(left))
            }
        }, 1000)

        return () => clearInterval(id)
    }, [seconds])

    return <div>{timeLeft}</div>
}