import React, { useState } from "react";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import LoopIcon from '@mui/icons-material/Loop';

import GameButton from "../atoms/GameButton";
import GameCategoryDropdown from "../atoms/GameCategoryDropdown";
import GameInput from "../atoms/GameInput";
import GameLinkContainer from "../components/GameLinkContainer";
import Box from '@mui/material/Box';


function GameSetup() {
  const categories = ["Seekabelkunde", "BWL", "VWL"];

  const [time, setTime] = useState(20); // Timelimit to answer a question
  const [NumberOfRounds, setNumberOfRounds] = useState(5); // Amount of rounds of a single game. One Round contains three questions
  const [category, setCategory] = useState(categories[0]); //Category the player has choosen in the Dropdown

  const [linkOne, setLinkOne] = useState('https://isefquiz01.de/quiz?player1=accesstoken1');
  const [linkTwo, setLinkTwo] = useState('https://isefquiz01.de/quiz?player2=accesstoken2');

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

  return (
    <div style={style.formContainer}>
      <Box
        sx={{
          width: 700,
          maxWidth: '100%',
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
            value: category, label: category,
          }))}
          selectedOption={category}
          onChange={handleCategoryChange}
          name="Kategorie wählen"
        />

        <GameInput
          value={NumberOfRounds}
          onChange={handleNumberOfRoundsChange}
          label="Runden"
          min="1"
          max="10"
          step="1"
          type="number"
          icon={<LoopIcon />}
        />
        <div style={style.buttonContainer}>
          <GameButton label="Singleplayer" />
          <GameButton label="Multiplayer" />
        </div>
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
      </Box>


    </div>
  );
}

export default GameSetup;

const style = {
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },

  buttonContainer: {
    display: 'grid',
    height: 50,
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridColumnGap: '20px',
  },



}
