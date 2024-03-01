import { useState, useEffect } from "react";
import React from "react";
import GameIntro from "../components/GameIntro.js";
import GameQuestion from "../components/GameQuestion.js";
import GameScoreboard from "../components/GameScoreboard.js";
import GameSumUp from "../components/GameSumUp.js";
import { CircularProgress } from "@mui/material";
import {
  fetchData
} from "../api.js";
import GameChooseCategory from "../components/GameChooseCategory.js";

function Game() {
  //Use States to decide which Component is rendered
  const [yourTurn, setYourTurn] = useState(); //decides if is your Turn of answering questions 
  const [roundStarted, setRoundStarted] = useState(false);  //decides if round has started
  const [roundEnded, setRoundEnded] = useState(false);      //decides if round has ended
  const [gameEnded, setGameEnded] = useState(false);        //decides if game has ended  --> show GameSumUp View
  const [isSinglePlayer, setIsSinglePlayer] = useState(false); //decides if game is a singleplayer or multiplayer quiz

  //get the accessToken of the URL-Parameter
  const [accessToken, setAccessToken] = useState(new URLSearchParams(window.location.search).get('accesstoken'));
  const [quizdata, setQuizdata]=useState();

  //stores current game Data
  const [player, setPlayer] = useState();   // player=1 for Player1 and player=2 for Player2
  const [currentQuizID, setCurrentQuizID] = useState(); //stores ID of a the current Quiz
  const [currentQuestion, setCurrentQuestion] = useState();  //stores the ID of current Question
  const [currentCategory, setCurrentCategory] = useState();  //stores categoryName of current Round/Question
  const [currentRound, setCurrentRound] = useState();        //stores the ID of currentRound
  const [currentQuestionData, setCurrentQuestionData] = useState(); //stores questionText and answer texts //TODO: ADD ID NECESSARY FOR MODAL
  const [timer, setTimer] = useState(); //stores TimeLimit to answer a question
  const [loading, setDataSet] = useState(false); //for loading animation
  const [answerGiven, setAnswerGiven] = useState();  //stores answer given by player --> 0-2 : false, 3 : correct, 5: timer run out

  async function calculateRelevantData() {
    setDataSet(false); //start loading animation
    const data = await fetchData(accessToken); //get all relevant data from Database. Note: Needs to be async, because takes some time
    //use non UseState-Variables for better performance. If direct use of UseStates they wouldnt be set in time for further calculations
    const isSinglePlayerC = decideQuizType(data);
    const currentPlayerC = getCurrentPlayer(data, accessToken);
    const currentQuestionC = getCurrentQuestion(data, currentPlayerC);
    const currentCategoryC = getCurrentCategory(data, currentPlayerC);
    const currentRoundC = Math.ceil(currentQuestionC / 3);
    const yourTurnC = decideTurn(data, currentPlayerC, isSinglePlayerC);
    const currentQuestionDataC = getQuestionData(data, currentQuestionC);
    const timeToAnswer = data[1].TimeToAnswer;
    const quizIDC = data[1].QuizID;
    let newRoundC = decideNewRound(data, currentQuestionC);
    let gameEndedC = decideGameEnded(data, currentQuestionC);
    console.log({
      isSinglePlayerC: decideQuizType(data),
      currentPlayerC: getCurrentPlayer(data, accessToken),
      currentQuestionC: getCurrentQuestion(data, currentPlayerC),
      currentCategoryC: getCurrentCategory(data, currentPlayerC),
      currentRoundC: Math.ceil(getCurrentQuestion(data, currentPlayerC) / 3),
      yourTurnC: decideTurn(data, currentPlayerC, decideQuizType(data)),
      currentQuestionDataC: getQuestionData(data, getCurrentQuestion(data, currentPlayerC)),
      timeToAnswer: data[1].TimeToAnswer,
      quizIDC: data[1].QuizID,
      newRound: decideNewRound(data, getCurrentQuestion(data, currentPlayerC))
    });
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
    setQuizdata(data);
    setDataSet(true);
  }


  //fetches data from DB and extracts relevant data when site loads
  useEffect(() => {
    calculateRelevantData();
  }, []);

  //whenever a answer is clicked on by the player, it writes his answer to the DB
  useEffect(() => {
    if(answerGiven!==null){
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
    for (let i = 0; i < data.length; i++) {
      if (data[i]["AnswerPlayer" + player] === null) {
        return data[i]["QuestionNumber"];
      }
       if(i===data.length-1 && data[i]["AnswerPlayer" + player] !== null){
         return 999; //codeNumber for Game finished
       }
    }
  }

  //extract the Number of currentQuestion, that hasnt been played yet
  function decideNewRound(data, currentQuestion) {
    try {
      if (data[currentQuestion-1].QuestionID===null){
        return true;
      }
      else{
        return false
      }
    }
    catch{}
  }

  //extract the Number of currentQuestion, that hasnt been played yet
  function decideGameEnded(data) {
      if (getCurrentQuestion(data, 1) ===999 && getCurrentQuestion(data, 2) === 999){
        return true;
      }
      else{
        return false
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

  //decides if Game is multiplayer or singleplayer by looking if AccesstokenTwo is existing in the data
  function decideQuizType(data) {
   if(data[1].AccessTokenTwo!==null){
     return false
   }
   else {
    return true
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
    console.log(" hh"+currentQuestionData[1]===null);
    if(currentQuestionData===null){
      setRoundEnded(true);
      console.log("done");
    }
    //if questionID = null --> set round Ended --> trigger rendering of Choose a new Category --> Choose Catergory --> setRound Ended (false)
  }

  //write the givenAnswer to DB the Moment the Answer is clicked on to avoid cheating
  async function setAnswerPlayer(quizID, questionNumber, givenAnswer, player) {
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
     {!loading ? <CircularProgress/> : ""}
      {(roundStarted === false && gameEnded === false && roundEnded=== false) || (roundEnded === true && gameEnded === false &&yourTurn===false) ? (
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
      {roundEnded && yourTurn? 
      <GameChooseCategory
      currentRound={currentRound}
      currentQuestion={currentQuestion}
      currentQuizID={currentQuizID}
      setRoundEnded={setRoundEnded}
      setRoundStarted={setRoundStarted}
      calculateRelevantData={calculateRelevantData}
      ></GameChooseCategory>
      : ""}
      {gameEnded === true ? <GameSumUp /> : ""}
      <div style={{margin:"10rem"}}></div>
      {quizdata ? 
      <GameScoreboard 
      quizdata={quizdata}
      isSinglePlayer={isSinglePlayer}/> 
      : 
      ""
      }
    </>
  );
}

export default Game;
