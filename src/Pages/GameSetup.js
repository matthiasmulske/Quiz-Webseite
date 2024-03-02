import React, { useState, useEffect } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import LoopIcon from "@mui/icons-material/Loop";
import GameButton from "../atoms/GameButton.js";
import GameCategoryDropdown from "../atoms/GameCategoryDropdown.js";
import GameInput from "../atoms/GameInput.js";
import GameLinkContainer from "../components/GameLinkContainer.js";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import {
  fetchQuestionCategories,
  checkAccessToken,
  getThreeQuestionsByCat,
  createQuizInDB,
} from "../api.js";
import domain from "./../assets/domain.js"

function GameSetup() {
  const [categories, setCategories] = useState([]);//stores QuestionCategories from DB
  const [loading, setLoading] = useState(false); //if true renders a loading animation while quiz is created in DB
  const [time, setTime] = useState(20); // Timelimit to answer a question
  const [numberOfRounds, setNumberOfRounds] = useState(5); // Amount of rounds of a single game. One Round contains three questions
  const [category, setCategory] = useState(categories[0]); //Category the player has choosen in the Dropdown
  const [linkOne, setLinkOne] = useState(); //generated Link for player1 to join a quiz
  const [linkTwo, setLinkTwo] = useState(); //generated Link for player2 to join a quiz
    
  const fetchCategories = async () => {
      try {
        console.log(domain.domain);
        let options = await fetchQuestionCategories(domain.domain +":5000/categories", "");
        let optionsArray = options.map(category => ({
          value: category.QuestionCategoryID,
          label: category.Name
      }));
      return optionsArray
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

  //get categories from Database when component mounts
  useEffect(() => {
    getData();
  }, []);

  async function getData(){
    let options = await fetchCategories();
    setCategories(options);
  }
  
  
  // handles Input of the Timelimit
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  // Handles Input of the Rounds to be played
  const handleNumberOfRoundsChange = (event) => {
    setNumberOfRounds(event.target.value);
  };

  // handles Input of the first Round to be played
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // generates AccessTokens for a quiz. Output is not savely unique. Note Math.random is not crypto save, but for this purpose ok
  function generateAccessToken() {
    // Generate a large random number
    var randomNumber = Math.floor(Math.random() * 10000000000000000);
    // Convert the random number to a hexadecimal String
    var hexString = randomNumber.toString(16);
    return hexString;
  }

  //creates a new instance of quiz in DB
  async function createQuiz(isSinglePlayer) {
    setLoading(true); //starts loading animation
    let IsUniqueAccesstoken = false; //boolean to check if generated Accesstoken already exists in DB
    let accessToken1 = null;
    let accessToken2 = null;
    do {
      //create a accesstokens
      accessToken1 = generateAccessToken(); //generate AccessToken1
      if (!isSinglePlayer) {
        accessToken2 = generateAccessToken(); //generate AccessToken2
      }
      //check if accesstokens already exist in db
      IsUniqueAccesstoken = await checkAccessToken(
        domain.domain + ":5000/accessToken",
        accessToken1,
        accessToken2
      );
    } while (IsUniqueAccesstoken === false); //generate new Accesstoken if one of them already exists in DB

    //generate the first three questions for new quiz
    const questions = await getThreeQuestionsByCat(
      domain.domain + ":5000/getThreeQuestionsByCat",
      category
    );
    const questionIds = [
      questions[0].QuestionID,
      questions[1].QuestionID,
      questions[2].QuestionID,
    ];

    //create a new quiz in DB by creating a quiz and saving space in QuizQuestions for rounds*3 questions
    let res = await createQuizInDB(
      domain.domain + ":5000/createQuizInDB2",
      accessToken1,
      accessToken2,
      numberOfRounds,
      time,
      questionIds[0],
      questionIds[1],
      questionIds[2]
    );
    console.log(res);
    //generate Links for quiz
    setLinkOne(domain.domain + ":3000/Game?accesstoken=" + accessToken1);
    if (!isSinglePlayer) {
      setLinkTwo(domain.domain + ":3000/Game?accesstoken=" + accessToken2);
    }
    //EndLoading Animation
    setLoading(false);
  }

  return (
    <div style={style.formContainer}>
      <Box
        sx={{
          width: 700,
          maxWidth: "100%",
        }}
      >
        <GameInput
          value={time}
          onChange={handleTimeChange}
          label="Zeitlimit"
          min="5"
          max="60"
          step="1"
          type="number"
          helperText="in sec"
          icon={<AccessAlarmIcon />}
        />

        <GameCategoryDropdown
          label="Kategorie*"
          options={categories}
          selectedOption={category}
          onChange={handleCategoryChange}
        />

        <GameInput
          value={numberOfRounds}
          onChange={handleNumberOfRoundsChange}
          label="Runden"
          min="1"
          max="10"
          step="1"
          type="number"
          icon={<LoopIcon />}
        />
        {category ? (
          <div style={style.buttonContainer}>
            <GameButton label="Singleplayer" onClick={() => createQuiz(true)} />
            <GameButton label="Multiplayer" onClick={() => createQuiz(false)} />
          </div>
        ) : (
          ""
        )}
        {loading ? <CircularProgress style={style.animation} /> : ""}

        {linkOne ? (
          <div>
            <GameLinkContainer
              player="Spieler 1"
              linkText={linkOne}
              id="linkText1"
            />
            {linkTwo ? (
              <GameLinkContainer
                player="Spieler 2"
                linkText={linkTwo}
                id="linkText2"
              />
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
      </Box>
    </div>
  );
}

export default GameSetup;

const style = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  buttonContainer: {
    display: "grid",
    height: 50,
    gridTemplateColumns: "repeat(2, 1fr)", // 2 columns, each with equal width
    gridColumnGap: "20px",
  },

  animation: {
    margin: "2rem",
  },
};
