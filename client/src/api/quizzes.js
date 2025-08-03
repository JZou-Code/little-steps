import generateQuiz from "../mock/fakeQuestions.js";

export const fetchQuizzes = () => {

    try {
        return Promise.resolve(
            generateQuiz()
        )
    }catch (e){
        console.log(e.message)
    }

    // return Promise.resolve(
    //     generateQuiz()
    // )
}