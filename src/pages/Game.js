import { useState, useEffect } from "react";
import React from "react";
import GameIntro from "../components/GameIntro.js";
import GameQuestion from "../components/GameQuestion.js";
import GameScoreboard from "../components/GameScoreboard.js";
import GameSumUp from "../components/GameSumUp.js";
import { CircularProgress } from "@mui/material";
import { fetchGameInfo } from "../api.js";
import GameChooseCategory from "../components/GameChooseCategory.js";
import Divider from "@mui/material/Divider";
import GameButton from "../atoms/GameButton.js";
import domain from "./../assets/domain.js";

function Game() {
  //Use States to decide which Component is rendered
  const [yourTurn, setYourTurn] = useState(); //decides if is your Turn of answering questions
  const [roundStarted, setRoundStarted] = useState(false); //decides if round has started
  const [roundEnded, setRoundEnded] = useState(); //decides if round has ended
  const [gameEnded, setGameEnded] = useState(); //decides if game has ended  --> show GameSumUp View
  const [showScoreboard, setShowScoreboard] = useState(false); //decides if scoreboard is rendered or not
  const [isSinglePlayer, setIsSinglePlayer] = useState(); //decides if game is a singleplayer or multiplayer quiz

  //get the accessToken of the URL-Parameter
  // eslint-disable-next-line
  const [accessToken, setAccessToken] = useState(
    new URLSearchParams(window.location.search).get("accesstoken"),
  ); //get accesstoken for a specific quiz from url
  const [quizdata, setQuizdata] = useState(); //QuizData from DB needed to render Scoreboard

  //stores current game Data
  const [player, setPlayer] = useState(); // player=1 for Player1 and player=2 for Player2
  const [currentQuizID, setCurrentQuizID] = useState(); //stores ID of a the current Quiz
  const [currentQuestion, setCurrentQuestion] = useState(); //stores the ID of current Question
  const [currentCategory, setCurrentCategory] = useState(); //stores categoryName of current Round/Question
  const [currentRound, setCurrentRound] = useState(); //stores the ID of currentRound
  const [currentQuestionData, setCurrentQuestionData] = useState(); //stores questionText and answer texts
  const [rounds, setRounds] = useState(0); //stores Number of Rounds
  const [player1Score, setPlayer1Score] = useState(0); //Stores Score of Player1
  const [player2Score, setPlayer2Score] = useState(0); //Stores Score of Player2
  const [timer, setTimer] = useState(); //stores TimeLimit to answer a question
  const [isLoading, setIsLoading] = useState(false); //for loading animation
  const [answerGiven, setAnswerGiven] = useState(); //stores answer given by player --> 0-2 : false, 3 : correct, 5: timer run out

  async function calculateRelevantData() {
    setIsLoading(true); //start loading animation
    const data = await fetchGameInfo(accessToken); //get all relevant data from Database. Note: Needs to be async, because takes some time
    //use non UseState-Variables for better performance. If direct use of UseStates they wouldnt be set in time for further calculations
    const timeToAnswer = data[1].TimeToAnswer; //get the Timelimit
    const quizIDC = data[1].QuizID; //get the QuizID
    const isSinglePlayerC = decideQuizType(data); //decide if game is Singleplayer or Multiplayer
    const currentPlayerC = getCurrentPlayer(data, accessToken); // decide if player1 or player2 to is quizing
    const roundsC = data[1].Rounds;
    const currentQuestionC = getCurrentQuestion(data, currentPlayerC); //get the Number of the Question to be played
    const currentQuestionDataC = getQuestionData(data, currentQuestionC); //get the questionData of the currentQuestion (Text, Answers, ID)
    const currentCategoryC = getCurrentCategory(data, currentPlayerC); //get the category of the current question
    const currentRoundC = Math.ceil(currentQuestionC / 3); //calculate the current Round to be played
    const yourTurnC = decideTurn(data, currentPlayerC, isSinglePlayerC); //decide if its the quizing players turn
    const newRoundC = decideNewRound(data, currentQuestionC); //decide if a new Round is necessary
    const player1ScoreC = getPlayerScore(data, 1);
    const player2ScoreC = getPlayerScore(data, 2);
    let gameEndedC = false;
    if (isSinglePlayerC === false) {
      gameEndedC = decideGameEnded(data, 1) && decideGameEnded(data, 2); //decide if game has ended
    } else {
      gameEndedC = decideGameEnded(data, 1); //decide if game has ended
    }

    //after calculation is done, set UseStates for FrontEnd-Usage
    setPlayer(currentPlayerC);
    setCurrentRound(currentRoundC);
    setCurrentQuestion(currentQuestionC);
    setCurrentCategory(currentCategoryC);
    setYourTurn(yourTurnC);
    setRoundEnded(!yourTurnC);
    setGameEnded(gameEndedC);
    setTimer(timeToAnswer);
    setCurrentQuestionData(currentQuestionDataC);
    setCurrentQuizID(quizIDC);
    setRoundEnded(newRoundC);
    setIsSinglePlayer(isSinglePlayerC);
    setPlayer1Score(player1ScoreC);
    setPlayer2Score(player2ScoreC);
    setRounds(roundsC);
    setQuizdata(data);
    setIsLoading(false);
  }

  //get relevantData when site loads for first time
  useEffect(() => {
    calculateRelevantData();
    // eslint-disable-next-line
  }, []);

  //End Round if no question Data is present
  useEffect(() => {
    if (currentQuestionData === null) {
      setRoundEnded(true);
    }
  }, [currentQuestionData]);

  //whenever a answer is clicked on by the player, it writes his answer to the DB
  useEffect(() => {
    if (answerGiven !== null) {
      setAnswerPlayer(currentQuizID, currentQuestion, answerGiven, player);
    }
    // eslint-disable-next-line
  }, [answerGiven]);

  //extracts the current Player from Data by looking at the accesstoken provided
  function getCurrentPlayer(data, accessToken) {
    if (accessToken === data[1].AccessTokenOne) {
      return 1;
    } else if (accessToken === data[1].AccessTokenTwo) {
      return 2;
    }
  }

  //extract the Number of currentQuestion, that hasnt been played yet
  function getCurrentQuestion(data, player) {
    for (let i = 0; i < data.length; i++) {
      if (data[i]["AnswerPlayer" + player] === null) {
        return data[i]["QuestionNumber"];
      }
      if (i === data.length - 1 && data[i]["AnswerPlayer" + player] !== null) {
        return 999; //codeNumber for Game finished
      }
    }
  }

  //extract the Number of currentQuestion, that hasnt been played yet
  function getPlayerScore(data, player) {
    let scorePlayer1 = 0;
    let scorePlayer2 = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i]["AnswerPlayer" + player] === 4) {
        scorePlayer1 = scorePlayer1 + 1;
      }
      if (data[i]["AnswerPlayer" + player] === 4) {
        scorePlayer2 = scorePlayer2 + 1;
      }
    }
    return scorePlayer1;
  }

  //extract the Number of currentQuestion, that hasnt been played yet
  function decideNewRound(data, currentQuestion) {
    try {
      if (data[currentQuestion - 1].QuestionID === null) {
        return true;
      } else {
        return false;
      }
    } catch {}
  }

  //extract the Number of currentQuestion, that hasnt been played yet
  function decideGameEnded(data, player) {
    if (getCurrentQuestion(data, player) === 999) {
      return true;
    } else {
      return false;
    }
  }

  //extracts the current Category by looking at the category of the current question
  function getCurrentCategory(data, player) {
    let questionFound = false; // Flag to track if the condition has been met
    for (let i = 0; i < data.length && !questionFound; i++) {
      const question = data[i];
      if (question["AnswerPlayer" + player] === null) {
        questionFound = true; // Set flag to true after first occurrence
        return question["Name"];
      }
    }
    return null;
  }

  //decides if its the active players turn
  function decideTurn(data, player, isSinglePlayer) {
    const Player1Round = Math.ceil(getCurrentQuestion(data, 1) / 3);
    const Player2Round = Math.ceil(getCurrentQuestion(data, 2) / 3);
    if (!isSinglePlayer) {
      if (Player1Round === 333 && Player2Round === 333) {
        setGameEnded(true);
      }
      if (
        player === 1 &&
        (Player1Round === 1 ||
          Player1Round === Player2Round - 1 ||
          (Player2Round === Player1Round && Player1Round % 2 === 1) ||
          Player2Round === 333)
      ) {
        return true;
      } else if (
        player === 2 &&
        (Player2Round === Player1Round - 1 ||
          (Player2Round === Player1Round && Player2Round % 2 === 0) ||
          Player1Round === 333)
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  //decides if Game is multiplayer or singleplayer by looking if AccesstokenTwo is existing in the data
  function decideQuizType(data) {
    if (data[1].AccessTokenTwo !== null) {
      return false;
    } else {
      return true;
    }
  }

  //sets state of RoundStarted to true, in order to apply conditional rendering
  function startRound() {
    setRoundStarted(true);
  }

  //extracts questiondata. Note that answers[3] is always the correct answer
  function getQuestionData(data, questionNumber) {
    const question = data.find((q) => q.QuestionNumber === questionNumber);
    if (question) {
      return {
        questionText: question.QuestionText,
        questionID: question.QuestionID,
        answers: [
          question.Answer1,
          question.Answer2,
          question.Answer3,
          question.CorrectAnswer,
        ],
      };
    } else {
      return "Question not found.";
    }
  }

  //triggered after continuing with the next question to get new Data
  async function handleNextQuestion() {
    await calculateRelevantData();
    //if questionID = null --> set round Ended --> trigger rendering of Choose a new Category --> Choose Catergory --> setRound Ended (false)
  }

  //write the givenAnswer to DB the Moment the Answer is clicked on to avoid cheating
  async function setAnswerPlayer(quizID, questionNumber, givenAnswer, player) {
    //UPDATE QuizQuestions SET AnswerPlayer1 = 5 WHERE QuizID = 2 AND QuestionNumber = 4;
    const setPlayer1Answer = async (answerGiven, quizID, questionNumber) => {
      try {
        const response = await fetch(
          domain.domain + ":5000/updatePlayer1Answer",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              answerGiven: answerGiven,
              quizID: quizID,
              questionNumber: questionNumber,
            }),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    const setPlayer2Answer = async (answerGiven, quizID, questionNumber) => {
      try {
        const response = await fetch(
          domain.domain + ":5000/updatePlayer2Answer",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              answerGiven: answerGiven,
              quizID: quizID,
              questionNumber: questionNumber,
            }),
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    if (player === 1) {
      setPlayer1Answer(givenAnswer, quizID, questionNumber);
    }
    if (player === 2) {
      setPlayer2Answer(givenAnswer, quizID, questionNumber);
    }
  }

  return (
    <>
      {isLoading ? <CircularProgress /> : ""}
      {(roundStarted === false &&
        gameEnded === false &&
        roundEnded === false) ||
      (roundEnded !== false && gameEnded === false && yourTurn === false) ? (
        <GameIntro
          currentRound={currentRound}
          currentCategory={currentCategory}
          turn={yourTurn}
          startRound={startRound}
        />
      ) : (
        ""
      )}
      {roundStarted === true && roundEnded === false && gameEnded === false ? (
        <GameQuestion
          question={currentQuestionData.questionText}
          answers={currentQuestionData.answers}
          questionID={currentQuestionData.questionID}
          timer={timer}
          setTimer={setTimer}
          answerGiven={answerGiven}
          setAnswerGiven={setAnswerGiven}
          handleNextQuestion={handleNextQuestion}
        />
      ) : (
        ""
      )}
      {roundEnded && yourTurn ? (
        <GameChooseCategory
          currentRound={currentRound}
          currentQuestion={currentQuestion}
          currentQuizID={currentQuizID}
          setRoundEnded={setRoundEnded}
          setRoundStarted={setRoundStarted}
          handleButton={handleNextQuestion}
        ></GameChooseCategory>
      ) : (
        ""
      )}
      {gameEnded === true ? (
        <GameSumUp
          player={player}
          player1Score={player1Score}
          player2Score={player2Score}
          rounds={rounds}
          isSinglePlayer={isSinglePlayer}
        ></GameSumUp>
      ) : (
        ""
      )}
      <Divider style={style.marginCenter} variant="middle" />
      <div style={style.marginCenter}>
        <GameButton
          label="Zeige Scoreboard"
          onClick={() => setShowScoreboard(!showScoreboard)}
        ></GameButton>
      </div>
      {quizdata && showScoreboard ? (
        <GameScoreboard
          quizdata={quizdata}
          isSinglePlayer={isSinglePlayer}
          player1Score={player1Score}
          player2Score={player2Score}
          currentQuestion={currentQuestion}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Game;
const style = {
  marginCenter: {
    margin: "2rem",
    textAlign: "center",
  },
};
