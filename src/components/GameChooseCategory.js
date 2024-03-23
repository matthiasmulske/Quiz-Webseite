import React, { useState, useEffect } from "react";
import GameButton from "../atoms/GameButton.js";
import GameCategoryDropdown from "../atoms/GameCategoryDropdown.js";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import {
  setNewRound,
  fetchQuestionCategories,
  getThreeQuestionsByCat,
} from "../api.js";
import domain from "./../assets/domain.js";

function GameChooseCategory({
  currentRound,
  currentQuestion,
  currentQuizID,
  setRoundEnded,
  setRoundStarted,
  handleButton,
}) {
  const [categories, setCategories] = useState([]); //stores QuestionCategories from DB
  const [loading, setLoading] = useState(false); //if true renders a loading animation while quiz is created in DB
  const [category, setCategory] = useState(); //Category the player has choosen in the Dropdown

  const fetchCategories = async () => {
    try {
      let options = await fetchQuestionCategories(
        domain.domain + "/categoriesToPlay",
        "",
      );
      let optionsArray = options.map((category) => ({
        value: category.QuestionCategoryID,
        label: category.Name,
      }));
      return optionsArray;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  //get categories from Database when component mounts
  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  async function getData() {
    let options = await fetchCategories();
    setCategories(options);
  }

  // handles Input of the first Round to be played
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  //
  async function handleButtonNewRound(currentQuizID, currentQuestion) {
    setLoading(true);
    const questions = await getThreeQuestionsByCat(
      domain.domain + "/getThreeQuestionsByCat",
      category,
    );
    const questionIds = [
      questions[0].QuestionID,
      questions[1].QuestionID,
      questions[2].QuestionID,
    ];
    await setNewRound(
      domain.domain + "/createNewRound",
      currentQuizID,
      currentQuestion,
      questionIds[0],
      questionIds[1],
      questionIds[2],
    );
    await handleButton();
    setRoundStarted(true);
    setLoading(false);
  }

  return (
    <div style={style.formContainer}>
      <h1>Runde {currentRound}</h1>
      <p>
        Bitte wähle eine Kategorie für die Fragen {currentQuestion} -{" "}
        {currentQuestion + 2}
      </p>
      <Box
        sx={{
          width: 700,
          maxWidth: "100%",
        }}
      >
        <GameCategoryDropdown
          label="Kategorie*"
          options={categories}
          selectedOption={category}
          onChange={handleCategoryChange}
        />
        {loading ? <CircularProgress style={style.margin} /> : ""}
        {category ? (
          <div style={style.margin}>
            <GameButton
              label="Starte nächste Runde"
              onClick={() =>
                handleButtonNewRound(currentQuizID, currentQuestion)
              }
            ></GameButton>
          </div>
        ) : (
          ""
        )}
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

  margin: {
    margin: "2rem",
  },
};
