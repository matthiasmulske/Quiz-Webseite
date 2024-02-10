import React, { useState } from "react";
import GameScoreboardButton from "../atoms/GameScoreboardButton";
import Modal from "../components/Modal"; // Import your Modal component

function GameScoreboard() {
  // eslint-disable-next-line
  const [rounds, setRounds] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const openModal = () => {
    setIsModalOpen(true);
    console.log(isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    console.log(isModalOpen);
  };

  // Function to generate an array with numbers from 1 to rounds
  const generateRoundNumbers = () => {
    const roundNumbers = [];
    for (let i = 1; i <= rounds; i++) {
      roundNumbers.push(i);
    }
    return roundNumbers;
  };

  // Function to render GameScoreButton components for each round
  const renderRoundButtons = () => {
    const roundNumbers = generateRoundNumbers(); // Generate round numbers
    return roundNumbers.map((roundNumber) => (
      <div key={roundNumber}>
        {/* Render three GameScoreButton components for each round */}
        <GameScoreboardButton
          round={roundNumber}
          score={1}
          addClass="btn-success"
          onClick={openModal}
        />
        <GameScoreboardButton
          round={roundNumber}
          score={2}
          addClass="btn-secondary"
          onClick={openModal}
        />
        <GameScoreboardButton
          round={roundNumber}
          score={3}
          addClass="btn-danger"
          onClick={openModal}
        />
      </div>
    ));
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="row text-center">
        {!isModalOpen && (
          <>
            <div className="col-md-6 mb-4">
              <h3>Player 1</h3>
              {/* Render GameScoreButton components for each round */}
              {renderRoundButtons()}
              <h3>5</h3>
            </div>
            <div className="col-md-6 mb-4">
              <h3>Player 2</h3>
              {/* Render GameScoreButton components for each round */}
              {renderRoundButtons()}
              <h3>5</h3>
            </div>
          </>
        )}
      </div>
      {isModalOpen && <Modal onClose={closeModal} />}{" "}
      {/* Render Modal when isModalOpen is true */}
    </div>
  );
}

export default GameScoreboard;
