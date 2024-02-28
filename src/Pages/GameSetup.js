import React, { useState, useEffect } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import LoopIcon from "@mui/icons-material/Loop";

import GameButton from "../atoms/GameButton";
import GameCategoryDropdown from "../atoms/GameCategoryDropdown";
import GameInput from "../atoms/GameInput";
import GameLinkContainer from "../components/GameLinkContainer";
import Box from "@mui/material/Box";
import { fetchData, checkAccessToken, getThreeQuestionsByCat, createQuizInDB } from "./../api.js";

//TODO: Conditional rendering only when player selected Multiplayer, otherwise redirect to Game.js
function GameSetup() {
  const [categories, setCategories] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const data = [];
  useEffect(() => {
    // Call the function to fetch categories when the component mounts
    fetchData(
      "http://localhost:5000/categories",
      setCategories,
      "",
      setDataFetched
    );
    return () => {};
  }, []);

  const [time, setTime] = useState(20); // Timelimit to answer a question
  const [numberOfRounds, setNumberOfRounds] = useState(5); // Amount of rounds of a single game. One Round contains three questions
  const [category, setCategory] = useState(categories[0]); //Category the player has choosen in the Dropdown
  const [linkOne, setLinkOne] = useState();
  const [linkTwo, setLinkTwo] = useState();

  // handles Input of the Timelimit
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  // Handles Input of the Rounds to be played
  const handleNumberOfRoundsChange = (event) => {
    setNumberOfRounds(event.target.value);
  };

  // handles Input of the first Round to be played
  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue.value);
  };

  function generateAccessToken() {
    // Generate a random number between 0 and 255
    var randomNumber = Math.floor(Math.random() * 10000000000000000);
    // Convert the random number to hexadecimal
    var hexString = randomNumber.toString(16);
    // If the hexadecimal string is only one character long, prepend a '0' to make it two characters
    if (hexString.length === 1) {
      hexString = "0" + hexString;
    }
    return hexString;
  }

  async function createQuiz() {
    let IsUniqueAccesstoken = false;
    let accessToken1 = null;
    let accessToken2 = null;
    do {
      //create a accesstokens
      accessToken1 = generateAccessToken();
      accessToken2 = generateAccessToken();
      //check if accesstokens already exist in db
      IsUniqueAccesstoken = await checkAccessToken(
        "http://localhost:5000/accessToken",
        accessToken1,
        accessToken2
      );
    } while (IsUniqueAccesstoken === false);

    console.log("Zeitlimit: " +
    time +
    " KatergorieID: " +
    category +
    " Runden: " +
    numberOfRounds +
    " AccessTokens: " +
    accessToken1 +
    " " +
    accessToken2);
    //write quizdata to database
    //generate questions for quiz
    const questions = await getThreeQuestionsByCat("http://localhost:5000/getThreeQuestionsByCat", category);
    const questionIds = [questions[0].QuestionID, questions[1].QuestionID, questions[2].QuestionID,]
    console.log(questionIds);
    await createQuizInDB("http://localhost:5000/createQuizInDB2", accessToken1, accessToken2, numberOfRounds, time, questionIds[0],questionIds[1],questionIds[2]);
    //generate Links for quiz
    setLinkOne('http://localhost:3000/Game?accesstoken=' + accessToken1);
    setLinkTwo('http://localhost:3000/Game?accesstoken=' + accessToken2);
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
          unit="sec"
          helperText="in sec"
          icon={<AccessAlarmIcon />}
        />

        <GameCategoryDropdown
          label="Kategorie"
          options={categories.map((category) => ({
            value: category.QuestionCategoryID,
            label: category.Name,
          }))}
          selectedOption={category}
          onChange={handleCategoryChange}
          name="Kategorie wählen"
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
            <GameButton label="Singleplayer" onClick={createQuiz} />
            <GameButton label="Multiplayer" onClick={generateAccessToken} />
          </div>
        ) : (
          ""
        )}
        {linkOne ? (
          <div>
            <GameLinkContainer
              player="Spieler 1"
              linkText={linkOne}
              id="linkText1"
            />
            <GameLinkContainer
              player="Spieler 2"
              linkText={linkTwo}
              id="linkText2"
            />
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
};
