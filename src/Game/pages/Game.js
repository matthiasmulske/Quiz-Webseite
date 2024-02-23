import { useState, useEffect } from "react";
import React from "react";
import GameIntro from "../components/GameIntro";
import GameQuestion from "../components/GameQuestion";
import GameScoreboard from "../components/GameScoreboard";
import GameSumUp from "../components/GameSumUp";
import { fetchData } from './../api';

function Game() {
  //Use States to decide which Component is rendered
  const [yourTurn, setYourTurn] = useState(true);
  const [roundStarted, setRounStarted] = useState(false);
  const [roundEnded, setRounEnded] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [isSinglePlayer, setIsSinglePlayer] = useState(true);

  //get the necessary data for the current game
  const [gameData, setGameData] = useState([]);
  const [accessToken, setAccessToken] = useState("atsp2erd");
  const [dataFetched, setDataFetched] = useState(false);
  
  //stores current game Data
  const [player, setPlayer] = useState();
  const [questionCategory, setQuestionCategory] = useState();
  const [currentRound, setCurrentRound] = useState();
  const [currentQuestion, setCurrentQuestion] = useState();
  const [dataSet, setDataSet] = useState(false);
  
  useEffect(() => {
    fetchData('http://localhost:5000/gameData', setGameData, accessToken, setDataFetched)
  }, []);

  useEffect(() => {
    if(dataFetched){
    getCurrentPlayer(gameData, accessToken);
    }
  }, [dataFetched, gameData, player]);

  useEffect(() => {
    if(dataFetched){
    getCurrentQuestion(gameData, player);
    getCurrentCategory(gameData, player);
    }
  }, [player]);

  useEffect(() => {
    if(dataFetched){
    setCurrentRound(Math.ceil(currentQuestion / 3))
    setDataSet(true);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if(dataSet){
    console.log("Player: " + player + " Runde: " + currentRound + " Frage: " + currentQuestion + " Kategorie: " + questionCategory)
    console.log(gameData)
    }
  }, [dataSet, gameData, player]);

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
      }
    }
    return null;
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
