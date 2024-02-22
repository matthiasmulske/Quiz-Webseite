import {ClockLoader} from "react-spinners";
import React from "react";

function NotYourTurn( {timeLeft} ) {
    return (
        <div style={style.clockContainer}>
            <ClockLoader
                cssOverride={style.clock}
                size={75}
                color="#ffc107"
                loading={true}
                speedMultiplier={0.05}
            />

            <h1 className="text-warning" style={style.header}> Dein Mitspieler ist am Zug!</h1>
            <p style={style.paragraph}>Du gewinnst, falls dein Mitspieler seine Runde nicht innerhalb von{" "}
                {timeLeft} abschließt!
            </p>
        </div>
    )

}

export default NotYourTurn;

const style = {
    clockContainer: {
        padding: '25px',
    },

    header: {
        marginBottom: '10px',
        textAlign: 'center'
    },

    paragraph: {
        fontSize: 20,
    },

    clock: {
        marginBottom: '30px',
        display: 'block',
        margin: '0 auto',
    }
}
