import React, {useState} from "react";
import GameSumUp from "../components/GameSumUp";
import ContainerYourTurn from "../atoms/ContainerYourTurn";
import NotYourTurn from "../atoms/NotYourTurn";
import GameProgressBar from "../atoms/GameProgressBar";
import GameQuestionView from "../components/GameQuestionView";
import Button from "@mui/material/Button";
import ChunkContainer from "../atoms/ChunkContainer";
import GameScoreboardModal from "../components/GameScoreboardModal";

const answers = ["Morgen", "42", "Gestern", "753 v. Chr."]
const question = ["Wann wurde das Arpanet Seekabel verlegt?"]

function Game() {
    const [round, setRound] = useState(2);
    const [category, setCategory] = useState("Seekabelkunde");
    const [timeLeft, setTimeLeft] = useState("3d 12h 54min");
    const [yourTurn, setYourTurn] = useState(false);

  return (
      <>
          <div style={style.introContainer}>
              <h1 style={style.headerRound}>Runde {round}</h1>
              <h2 style={style.headerCategory}>{category}</h2>

              {yourTurn
                  ? <ContainerYourTurn/>
                  : <NotYourTurn timeLeft={timeLeft}/>
              }
          </div>
          <GameProgressBar/>
          <div style={style.answerButton}>
              <GameQuestionView question={question} answers={answers}/>
          </div>

          <div style={style.buttonNextQuestion}>
              <Button variant="outlined">Nächste Frage</Button>
          </div>

          <h2>Scoreboard</h2>
          <h2> scoreplayer1 : scorePlayer2 </h2>
          <div style={style.ChunkContainer}>
              <ChunkContainer/>
              <ChunkContainer/>
          </div>
          <GameSumUp/>
      </>
  );
}

export default Game;

const style = {
    introContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerRound: {
        fontSize: 40,
        marginBottom: '15px',

    },
    headerCategory: {
        marginBottom: '15px',

    },

    GridContainer: {
        display: 'grid',
            gridAutoFlow: 'row',
            gridTemplateColumns: 'auto auto' ,
            gridColumnGap: '1%',
    },
    ChunkContainer: {
        justifyContent: 'center',
            display: 'grid',
            gridAutoFlow: 'column',
    },
}
