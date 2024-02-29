import { useState, useEffect } from "react";
import React from "react";
import GameIntro from "../components/GameIntro.js";
import GameQuestion from "../components/GameQuestion.js";
import GameScoreboard from "../components/GameScoreboard.js";
import GameSumUp from "../components/GameSumUp.js";
import {
  fetchData
} from "./../api.js";

function Game() {
  //Use States to decide which Component is rendered
  const [yourTurn, setYourTurn] = useState(); //decides if is your Turn of answering questions 
  const [roundStarted, setRoundStarted] = useState(false);  //decides if round has started
  const [roundEnded, setRoundEnded] = useState(false);      //decides if round has ended
  const [gameEnded, setGameEnded] = useState(false);        //decides if game has ended  --> show GameSumUp View
  const [isSinglePlayer, setIsSinglePlayer] = useState(false); //decides if game is a singleplayer or multiplayer quiz

  //get the accessToken of the URL-Parameter
  const [accessToken, setAccessToken] = useState(new URLSearchParams(window.location.search).get('accesstoken'));

  //stores current game Data
  const [player, setPlayer] = useState();   // player=1 for Player1 and player=2 for Player2
  const [currentQuizID, setCurrentQuizID] = useState(); //stores ID of a the current Quiz
  const [currentQuestion, setCurrentQuestion] = useState();  //stores the ID of current Question
  const [currentCategory, setCurrentCategory] = useState();  //stores categoryName of current Round/Question
  const [currentRound, setCurrentRound] = useState();        //stores the ID of currentRound
  const [currentQuestionData, setCurrentQuestionData] = useState(); //stores questionText and answer texts //TODO: ADD ID NECESSARY FOR MODAL
  const [timer, setTimer] = useState(); //stores TimeLimit to answer a question
  const [dataSet, setDataSet] = useState(false); //for loading animation
  const [answerGiven, setAnswerGiven] = useState();  //stores answer given by player --> 0-2 : false, 3 : correct, 5: timer run out

  async function calculateRelevantData() {
    setDataSet(false); //start loading animation
    const data = await fetchData(accessToken); //get all relevant data from Database. Note: Needs to be async, because takes some time
    //use non UseState-Variables for better performance. If direct use of UseStates they wouldnt be set in time for further calculations
    const currentPlayerC = getCurrentPlayer(data, accessToken);
    const currentQuestionC = getCurrentQuestion(data, currentPlayerC);
    const currentCategoryC = getCurrentCategory(data, currentPlayerC);
    const currentRoundC = Math.ceil(currentQuestionC / 3);
    const yourTurnC = decideTurn(data, currentPlayerC, isSinglePlayer);
    const currentQuestionDataC = getQuestionData(data, currentQuestionC);
    const timeToAnswer = data[1].TimeToAnswer;
    const quizID = data[1].QuizID;
    
    //after calculation is done, set UseStates for FrontEnd-Usage
    setPlayer(currentPlayerC);
    setCurrentRound(currentRoundC);
    setCurrentQuestion(currentQuestionC);
    setCurrentCategory(currentCategoryC);
    setYourTurn(yourTurnC);
    setRoundEnded(!yourTurnC);
    setTimer(timeToAnswer);
    setCurrentQuestionData(currentQuestionDataC);
    setCurrentQuizID(quizID);
    setDataSet(true);
  }

  //fetches data from DB and extracts relevant data when site loads
  useEffect(() => {
    calculateRelevantData();
  }, []);

  //whenever a answer is clicked on by the player, it writes his answer to the DB
  useEffect(() => {
    console.log(answerGiven);
    if(answerGiven){
      setAnswerPlayer(currentQuizID, currentQuestion, answerGiven, player);
    }
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
    let questionFound = false; // Flag to track if the condition has been met
    for (let i = 0; i < data.length && !questionFound; i++) {
      const question = data[i];
      if (question["AnswerPlayer" + player] === null) {
        questionFound = true; // Set flag to true after first occurrence
        return question["QuestionNumber"];
      }
      if(i===data.length-1 && question["AnswerPlayer" + player] !== null){
        return 999; //codeNumber for Game finished
      }
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
      if (Player1Round===333 && Player2Round ===333){
        setGameEnded(true);
      }
      if (
        player === 1 &&
        (Player1Round === 1 ||
          Player1Round === Player2Round - 1 ||
          (Player2Round === Player1Round && Player1Round % 2 === 1) ||
          Player2Round===333) 
      ) {
        return true;
      } else if (
        player === 2 &&
        (Player2Round === Player1Round - 1 ||
          (Player2Round === Player1Round && Player2Round % 2 === 0)||
          Player1Round===333)
      ) {
        return true;
      } else {
        return false;
      }
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
  function handleNextQuestion() {
    calculateRelevantData();
    //if questionID = null --> set round Ended --> trigger rendering of Choose a new Category --> Choose Catergory --> setRound Ended (false)
  }

  //write the givenAnswer to DB the Moment the Answer is clicked on to avoid cheating
  function setAnswerPlayer(quizID, questionNumber, givenAnswer, player) {
    //UPDATE QuizQuestions SET AnswerPlayer1 = 5 WHERE QuizID = 2 AND QuestionNumber = 4;
    const setPlayer1Answer = async (answerGiven, quizID, questionNumber) => {
      try {
        const response = await fetch(
          "http://localhost:5000/updatePlayer1Answer",
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
          }
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
          "http://localhost:5000/updatePlayer2Answer",
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
          }
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
      {dataSet ? <p></p> : <p>Get Data from Database</p>}
      {(roundStarted === false && gameEnded === false) || roundEnded ? (
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
          timer={timer}
          setTimer={setTimer}
          answerGiven={answerGiven}
          setAnswerGiven={setAnswerGiven}
          handleNextQuestion={handleNextQuestion}
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
