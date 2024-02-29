import React, { useState, useEffect } from "react";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import LoopIcon from "@mui/icons-material/Loop";
import GameButton from "../atoms/GameButton.js";
import GameCategoryDropdown from "../atoms/GameCategoryDropdown.js";
import GameInput from "../atoms/GameInput.js";
import GameLinkContainer from "./GameLinkContainer.js";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import {
  setNewRound,
  fetchQuestionCategories,
  getThreeQuestionsByCat
} from "../api.js";

function GameChooseCategory({currentRound, currentQuestion, currentQuizID, setRoundEnded, setRoundStarted, calculateRelevantData}) {
  const [categories, setCategories] = useState([]); //stores QuestionCategories from DB
  const [loading, setLoading] = useState(false); //if true renders a loading animation while quiz is created in DB
  const [category, setCategory] = useState(categories[0]); //Category the player has choosen in the Dropdown
  

  //get categories from Database when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let options = await fetchQuestionCategories("http://localhost:5000/categories", "");
        setCategories(options);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  // handles Input of the first Round to be played
  const handleCategoryChange = (event, newValue) => {
    setCategory(newValue.value);
  };

  //
  async function handleButtonNewRound(currentQuizID, currentQuestion){
    console.log(currentQuestion, currentQuizID);
    const questions = await getThreeQuestionsByCat(
      "http://localhost:5000/getThreeQuestionsByCat",
      category
    );
    const questionIds = [
      questions[0].QuestionID,
      questions[1].QuestionID,
      questions[2].QuestionID,
    ];
    console.log(questionIds);
    setNewRound("http://localhost:5000/createNewRound", currentQuizID, currentQuestion, questionIds[0],questionIds[1],questionIds[2]);
    setRoundEnded(false);
    setRoundStarted(false);
    calculateRelevantData();
  }

  return (
    <div style={style.formContainer}>
        <h1 style={style.headerRound}>Runde {currentRound}</h1>
        <p>Bitte wähle eine Kategorie für die Fragen {currentQuestion} - {currentQuestion+2}</p>
      <Box
        sx={{
          width: 700,
          maxWidth: "100%",
        }}
      >
        <GameCategoryDropdown
          label="Kategorie*"
          options={categories.map((category) => ({
            value: category.QuestionCategoryID,
            label: category.Name,
          }))}
          selectedOption={category}
          onChange={handleCategoryChange}
          name="Kategorie wählen"
        />
        <GameButton label="Starte nächste Runde" onClick={() => handleButtonNewRound(currentQuizID, currentQuestion)}>

        </GameButton>
      </Box>
    </div>
  );
}

export default GameChooseCategory;

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
