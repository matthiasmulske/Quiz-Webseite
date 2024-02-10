import React, { useState } from "react";
import GameStartButton from "../atoms/GameStartButton";
import GameCategoryDropdown from "../atoms/GameCategoryDropdown";
import GameTimer from "../atoms/GameTimer";
import GameInputRounds from "../atoms/GameInputRounds";
import GameLinkContainer from "../components/GameLinkContainer";

function GameSetup() {
  const options = ["Seekabelkunde", "BWL", "VWL"];
  const [time, setTime] = useState(20); // Initialize with empty string
  const [NumberOfRounds, setNumberOfRounds] = useState(5); // Initialize with empty string

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };
  const handleNumberOfRoundsChange = (event) => {
    setNumberOfRounds(event.target.value);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="col-md-6 text-center">
        <GameTimer value={time} onChange={handleTimeChange} />
        {/* <p>Selected time: {time}</p> */}
        <GameCategoryDropdown
          label="Kategorie"
          options={options.map((option) => ({ value: option, label: option }))}
          //selectedOption={test}
          //onChange={test}
          name="Kategorie wählen"
        />
        <GameInputRounds
          value={NumberOfRounds}
          onChange={handleNumberOfRoundsChange}
        />
        <GameStartButton
          label="Singleplayer starten"
          //onClick={}
        />
        <GameStartButton
          label="Multiplayer starten"
          //onClick={}
        />
        <GameLinkContainer player="Spieler 1" linkText="test1" id="linkText1" />
        <GameLinkContainer player="Spieler 2" linkText="test2" id="linkText2" />
      </div>
    </div>
  );
}

export default GameSetup;
