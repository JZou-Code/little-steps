import React, {useState, useEffect} from 'react';
import QuizContext from './QuizContext';
import {fetchQuizzes} from '../api/quizzes.js';
import {useNavigate} from "react-router-dom";

export default function QuizProvider({children}) {
    const [quizArr, setQuizArr] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [score, setScore] = useState(0)
    const [isResult, setIsResult] = useState(false);

    const navigate = useNavigate();

    const setNewQuiz = () => {
        fetchQuizzes()
            .then(data => {
                if (data.code === '200') {
                    setQuizArr(data.quizArr);
                    setUserAnswers(new Array(data.quizArr.length).fill(-1));
                } else {
                    throw new Error(data.message)
                }
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        setNewQuiz();
    }, []);

    const submit = (options) => {
        const tempAnswer = userAnswers.find(e => e === -1);
        if (!options.isTimeOver && tempAnswer) {
            const forceSubmit = confirm("You haven't finished yet. Are you sure you wanna submit now?")
            if (!forceSubmit) {
                return;
            }
        }

        const count = quizArr.reduce((sum, q, i) => {
            return sum + (userAnswers[i] === q.answer ? 1 : 0);
        }, 0);

        console.log(quizArr);
        console.log(userAnswers)

        setScore(count);
        setIsResult(true);

        navigate('/quiz/result', {replace: true})
        window.scroll(0, 0)
    };
    const reset = () => {
        setUserAnswers(new Array(quizArr.length).fill(-1));
        setScore(0);
        setIsResult(false);

        setLoading(true);
        setNewQuiz();
        window.scroll(0,0)
    };

    return (
        <QuizContext.Provider
            value={{
                quizArr,
                loading,
                error,
                score,
                userAnswers,
                isResult,
                setUserAnswers,
                submit,
                reset,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
}
