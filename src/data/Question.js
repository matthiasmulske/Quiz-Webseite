import data from "./questions.json";


export default function Question() {
    const question = []


    function createData() {
        for (let i = 0; i < data.questions.length; i++) {
            question.push({
                question: data.questions[i].question_text,
                answerA: data.questions[i].answers[0],
                answerB: data.questions[i].answers[1],
                answerC: data.questions[i].answers[2],
                answerD: data.questions[i].answers[3],
                category: ""
            })
        }
    }

    function getData(){

    }




}
