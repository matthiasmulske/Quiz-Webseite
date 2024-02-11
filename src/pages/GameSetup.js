import React, { useState } from "react";
import GameButtonStart from "../atoms/GameButtonStart";
import GameCategoryDropdown from "../atoms/GameCategoryDropdown";
import GameInputTimer from "../atoms/GameInputTimer";
import GameInputRounds from "../atoms/GameInputRounds";
import GameLinkContainer from "../components/GameLinkContainer";

function GameSetup() {
  const categories = ["Seekabelkunde", "BWL", "VWL"]; //stores all possible categories
  const [time, setTime] = useState(20); // Timelimit to answer a question
  const [NumberOfRounds, setNumberOfRounds] = useState(5); // Amount of rounds of a single game. One Round contains three questions
  const [category, setCategory] = useState("Seekabelkunde"); //Category the player has choosen in the Dropdown
  // eslint-disable-next-line
  const [linkOne, setLinkOne] = useState(
    "https://isefquiz01.de/quiz?player1=accesstoken1",
  ); // Timelimit to answer a question
  // eslint-disable-next-line
  const [linkTwo, setLinkTwo] = useState(
    "https://isefquiz01.de/quiz?player2=accesstoken2",
  ); // Timelimit to answer a question

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };
  const handleNumberOfRoundsChange = (event) => {
    setNumberOfRounds(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col text-center">
        <GameInputTimer value={time} onChange={handleTimeChange} />

        <GameCategoryDropdown
          label="Kategorie"
          options={categories.map((category) => ({
            value: category,
            label: category,
          }))}
          selectedOption={category}
          onChange={handleCategoryChange}
          name="Kategorie wählen"
        />

        <GameInputRounds
          value={NumberOfRounds}
          onChange={handleNumberOfRoundsChange}
        />

        <GameButtonStart
          label="Singleplayer"
          //onClick={}
        />
        <GameButtonStart
          label="Multiplayer"
          //onClick={}
        />

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
    </div>
  );
}

export default GameSetup;
