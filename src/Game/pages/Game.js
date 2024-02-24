import { useState, useEffect } from "react";
import React from "react";
import GameIntro from "../components/GameIntro";
import GameQuestion from "../components/GameQuestion";
import GameScoreboard from "../components/GameScoreboard";
import GameSumUp from "../components/GameSumUp";
import { fetchData } from './../api';

function Game() {
  //Use States to decide which Component is rendered
  const [yourTurn, setYourTurn] = useState();
  const [roundStarted, setRounStarted] = useState(false);
  const [roundEnded, setRounEnded] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [isSinglePlayer, setIsSinglePlayer] = useState();

  //get the necessary data for the current game
  const [gameData, setGameData] = useState([]);
  const [accessToken, setAccessToken] = useState("atsp1erd");
  const [dataFetched, setDataFetched] = useState(false);
  
  //stores current game Data
  const [player, setPlayer] = useState();
  const [questionCategory, setQuestionCategory] = useState();
  const [currentRound, setCurrentRound] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [dataSet, setDataSet] = useState(false);
  
  //fetch gameData
  useEffect(() => {
    fetchData('http://localhost:5000/gameData', setGameData, accessToken, setDataFetched)
  }, []);

  //decide who is playing
  useEffect(() => {
    if(dataFetched){
    getCurrentPlayer(gameData, accessToken);
    }
  }, [dataFetched, gameData, player]);

  //when you know who is playing, get the current question and category
  useEffect(() => {
    if(dataFetched){
    getCurrentQuestion(gameData, player);
    getCurrentCategory(gameData, player);
    }
  }, [player]);

  //when you know which question is played, you can calculate the turn number
  useEffect(() => {
    if(dataFetched){
    setCurrentRound(Math.ceil(currentQuestion / 3));
    decideTurn(gameData,player);
    setDataSet(true);
    }
  }, [currentQuestion]);

  //relevant data is set
  useEffect(() => {
    if(dataSet){
    console.log("Player: " + player + " Runde: " + currentRound + " Frage: " + currentQuestion + " Kategorie: " + questionCategory)
    console.log(gameData)
    console.log(yourTurn)
    }
  }, [dataSet]);

  useEffect(() => {
    console.log(yourTurn)
  }, [yourTurn]);

  function getCurrentPlayer(gameData, accessToken) {
    if (accessToken === gameData[1].AccessTokenOne){
      setPlayer(1);
    }
    else if (accessToken === gameData[1].AccessTokenTwo){
      setPlayer(2);
    }
  }

  function getCurrentQuestion(gameData, player) {
    let questionFound = false; // Flag to track if the condition has been met
    for (let i = 0; i < gameData.length && !questionFound; i++) {
      const question = gameData[i];
      if (question["AnswerPlayer" + player] === null) {
        setCurrentQuestion(question["QuestionNumber"]);
        questionFound = true; // Set flag to true after first occurrence
        return question["QuestionNumber"];
      }
    }
  }
  
  function getCurrentCategory(gameData, player) {
    let questionFound = false; // Flag to track if the condition has been met
    for (let i = 0; i < gameData.length && !questionFound; i++) {
      const question = gameData[i];
      if (question["AnswerPlayer" + player] === null) {
        setQuestionCategory(question["Name"]);
        questionFound = true; // Set flag to true after first occurrence
      }
    }
    return null;
  }

  //entscheidet welcher Spieler am Zug ist
  function decideTurn(gameData, player, isSinglePlayer) {
    const Player1Round = Math.ceil(getCurrentQuestion(gameData, 1) / 3);
    const Player2Round = Math.ceil(getCurrentQuestion(gameData, 2) / 3);

    if (!isSinglePlayer) {
        if (player === 1 && (Player1Round === 1 || Player1Round === Player2Round - 1)) {
            setYourTurn(true);
        } else if (player === 2 && Player2Round === Player1Round - 1) {
            setYourTurn(true);
        } else {
            setYourTurn(false);
        }
    } else {
        setYourTurn(true);
    }
}

  

  return (
    <>
      {(roundStarted === false && gameEnded === false) ?
        <GameIntro
          currentRound={currentRound}
          currentCategory={questionCategory}
          turn={yourTurn} /> : ""}
      {(roundStarted === true && roundEnded === false && gameEnded === false) ?
        <GameQuestion /> : ""
      }
      {gameEnded === true ?
        <GameSumUp /> : ""
      }
      <GameScoreboard />
    </>
  );
}

export default Game;
