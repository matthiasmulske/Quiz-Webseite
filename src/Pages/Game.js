import { useState, useEffect } from "react";
import React from "react";
import GameIntro from "../components/GameIntro.js";
import GameQuestion from "../components/GameQuestion.js";
import GameScoreboard from "../components/GameScoreboard.js";
import GameSumUp from "../components/GameSumUp.js";

function Game() {
  //Use States to decide which Component is rendered
  const [yourTurn, setYourTurn] = useState();
  const [roundStarted, setRoundStarted] = useState(false);
  const [roundEnded, setRoundEnded] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [isSinglePlayer, setIsSinglePlayer] = useState(false);

  //get the necessary data for the current game
  const [gameData, setGameData] = useState([]);
  const [accessToken, setAccessToken] = useState("atsp1erd");
  const [dataFetched, setDataFetched] = useState(false);

  //stores current game Data
  const [player, setPlayer] = useState();
  const [currentCategory, setCurrentCategory] = useState();
  const [currentRound, setCurrentRound] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [currentQuestionData, setCurrentQuestionData]= useState();
  const [dataSet, setDataSet] = useState(false);

  const fetchData = async (accessToken) => {
    try {
      const response = await fetch("http://localhost:5000/gameData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken: accessToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  async function calculateRelevantData() {
    setDataSet(false);
    const data = await fetchData(accessToken);
    console.log(data);
    const currentPlayerC = getCurrentPlayer(data, accessToken);
    const currentQuestionC = getCurrentQuestion(data, currentPlayerC);
    const currentCategoryC = getCurrentCategory(data, currentPlayerC);
    const currentRoundC = Math.ceil(currentQuestionC / 3);
    const yourTurnC = decideTurn(data, currentPlayerC, isSinglePlayer);
    console.log(
      "Player: " +
        currentPlayerC +
        " Runde: " +
        currentRoundC +
        " Frage: " +
        currentQuestionC +
        " Kategorie: " +
        currentCategoryC +
        " your Turn: " +
        yourTurnC
    );
    const currentQuestionDataC= getQuestionData(data, currentQuestionC);
    setPlayer(currentPlayerC);
    setCurrentRound(currentRoundC);
    setCurrentQuestion(currentQuestionC);
    setCurrentCategory(currentCategoryC);
    setYourTurn(yourTurnC);
    setDataSet(true);
    setCurrentQuestionData(currentQuestionDataC);
  }

  useEffect(() => {
    calculateRelevantData();
  }, []);

  function getCurrentPlayer(data, accessToken) {
    if (accessToken === data[1].AccessTokenOne) {
      return 1;
    } else if (accessToken === data[1].AccessTokenTwo) {
      return 2;
    }
  }

  function getCurrentQuestion(data, player) {
    let questionFound = false; // Flag to track if the condition has been met
    for (let i = 0; i < data.length && !questionFound; i++) {
      const question = data[i];
      if (question["AnswerPlayer" + player] === null) {
        questionFound = true; // Set flag to true after first occurrence
        return question["QuestionNumber"];
      }
    }
  }

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

  //entscheidet welcher Spieler am Zug ist
  function decideTurn(data, player, isSinglePlayer) {
    const Player1Round = Math.ceil(getCurrentQuestion(data, 1) / 3);
    const Player2Round = Math.ceil(getCurrentQuestion(data, 2) / 3);

    if (!isSinglePlayer) {
      if (
        player === 1 &&
        (Player1Round === 1 || Player1Round === Player2Round - 1)
      ) {
        return true;
      } else if (player === 2 && Player2Round === Player1Round - 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  function startRound(){
    setRoundStarted(true);
  }

  function getQuestionData(data, questionNumber){
    const question = data.find(q => q.QuestionNumber === questionNumber);
    if (question) {
        return {
            questionText: question.QuestionText,
            answers: [
                question.Answer1,
                question.Answer2,
                question.Answer3,
                question.CorrectAnswer,
            ]
        };
    } else {
        return "Question not found.";
    }
}
  

  return (
    <>
    {dataSet ? <p></p>: <p>Get Data from Database</p>}
      {roundStarted === false && gameEnded === false ? (
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
         />
      ) : (
        ""
      )}
      {gameEnded === true ? <GameSumUp /> : ""}
      <GameScoreboard />
    </>
  );
}

export default Game;
