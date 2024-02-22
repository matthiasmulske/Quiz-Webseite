import React, { useState, useEffect } from "react";


function GameProgressBar() {
    const [timer, setTimer] = useState(30);
    const [timeLeft, setTimeLeft] = useState(timer);

    // start Timer when site loads
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeLeft((prevTimeLeft) => {
                if (prevTimeLeft === 0) {
                    clearInterval(intervalId);
                    return 0;
                } else {
                    return prevTimeLeft - 0.05;
                }
            });
        }, 50);

        return () => clearInterval(intervalId);
    }, [timer]);

    return (
        <div style={style.pageContainer}>
            <div className="progress mb-4">
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${(timeLeft / timer) * 100}%` }}>
                </div>
            </div>
        </div>
    );
}

export default GameProgressBar;

const style = {
    pageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        position: 'relative',
    },

    answerButton: {
        marginBottom: 50,
    },
    buttonNextQuestion: {
        display: 'flex',
        justifyContent: 'center'
    }
}
