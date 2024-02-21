import React, { useState } from "react";
import questions from "../data/questions.json";
import QuestionPopper from "../atoms/QuestionPopper";

function GameChunkContainer() {
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
                    {chunk.map((data) => (
                        <QuestionPopper questionIndex={index}/>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default GameChunkContainer;

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
