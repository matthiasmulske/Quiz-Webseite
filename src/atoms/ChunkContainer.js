import React, { useState } from "react";
import GameButton from "../atoms/GameButton";
import questions from "../data/questions.json";

const question = "Hello World"

function GameScoreboard() {
    const [openQuestionModal, setOpenQuestionModal] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [modalPlayer, setModalPlayer] = useState(null);

    const handleButtonClick = (question, player) => {
        setModalData(question);
        setOpenQuestionModal(true);
        setModalPlayer(player);
    };

    const chunkArray = (arr, size) => {
        const chunkedArr = [];
        for (let i = 0; i < arr.length; i += size) {
            chunkedArr.push(arr.slice(i, i + size));
        }
        return chunkedArr;
    };
    const questionsChunks = chunkArray(questions.questions, 3);

    return (
        <div style={style.GridContainer}>
            {questionsChunks.map((chunk, index) => (
                <div key={index}>
                    {chunk.map((question) => (
                        <div key={question.question_number} style={style.button}>
                            <GameButton
                                color={(question.player1_answer===question.correct_answer) ? "success" : "error"}
                                onClick={() => handleButtonClick(question, "player1")}
                                label={question.question_number}
                                size="large"/>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default GameScoreboard;

const style = {
    GridContainer: {
        display: 'grid',
        gridAutoFlow: 'row',
        gridTemplateColumns: '20% 20% 20% 20%',
    },


    button: {
        padding: 10,
    }
}
