import React, { useState } from "react";
import GameScoreboardModal from "./GameScoreboardModal";
import GameButton from "../atoms/GameButton";

function GameScoreboard() {
  const data = {
    questions: [
      {
        question_number: 1,
        question_text: "What is the capital of France?",
        answers: {
          1: "Berlin",
          2: "Madrid",
          3: "Paris",
          4: "London",
        },
        correct_answer: 3,
        player1_answer: 1,
        player2_answer: 2,
      },
      {
        question_number: 2,
        question_text: "Who wrote 'Romeo and Juliet'?",
        answers: {
          1: "William Shakespeare",
          2: "Charles Dickens",
          3: "Jane Austen",
          4: "Mark Twain",
        },
        correct_answer: 1,
        player1_answer: 1,
        player2_answer: 2,
      },
      {
        question_number: 3,
        question_text: "What is the chemical symbol for water?",
        answers: {
          1: "H2O",
          2: "CO2",
          3: "NaCl",
          4: "O2",
        },
        correct_answer: 1,
        player1_answer: 1,
        player2_answer: 2,
      },
      {
        question_number: 4,
        question_text: "Who painted the Mona Lisa?",
        answers: {
          1: "Vincent van Gogh",
          2: "Leonardo da Vinci",
          3: "Pablo Picasso",
          4: "Michelangelo",
        },
        correct_answer: 2,
        player1_answer: 1,
        player2_answer: 2,
      },
      {
        question_number: 5,
        question_text: "What is the tallest mammal?",
        answers: {
          1: "Elephant",
          2: "Giraffe",
          3: "Kangaroo",
          4: "Horse",
        },
        correct_answer: 2,
        player1_answer: 1,
        player2_answer: 2,
      },
      {
        question_number: 6,
        question_text: "Which planet is known as the Red Planet?",
        answers: {
          1: "Mars",
          2: "Venus",
          3: "Mercury",
          4: "Saturn",
        },
        correct_answer: 1,
        player1_answer: 1,
        player2_answer: 2,
      },
      {
        question_number: 7,
        question_text: "Who is the author of 'To Kill a Mockingbird'?",
        answers: {
          1: "J.K. Rowling",
          2: "Harper Lee",
          3: "Ernest Hemingway",
          4: "Stephen King",
        },
        correct_answer: 2,
        player1_answer: 1,
        player2_answer: 2,
      },
      {
        question_number: 8,
        question_text: "What is the largest mammal in the world?",
        answers: {
          1: "Blue whale",
          2: "African elephant",
          3: "Giraffe",
          4: "Polar bear",
        },
        correct_answer: 1,
        player1_answer: 1,
        player2_answer: 2,
      },
      {
        question_number: 9,
        question_text: "What is the capital of Japan?",
        answers: {
          1: "Tokyo",
          2: "Beijing",
          3: "Seoul",
          4: "Osaka",
        },
        correct_answer: 1,
        player1_answer: 1,
        player2_answer: 2,
      },
      {
        question_number: 10,
        question_text: "Who invented the telephone?",
        answers: {
          1: "Thomas Edison",
          2: "Nikola Tesla",
          3: "Alexander Graham Bell",
          4: "Galileo Galilei",
        },
        correct_answer: 3,
        player1_answer: 1,
        player2_answer: 2,
      },
      {
        question_number: 11,
        question_text: "What is the chemical symbol for gold?",
        answers: {
          1: "Au",
          2: "Ag",
          3: "Pt",
          4: "Cu",
        },
        correct_answer: 1,
        player1_answer: 1,
        player2_answer: 2,
      },
      {
        question_number: 12,
        question_text: "Which year did the Titanic sink?",
        answers: {
          1: "1912",
          2: "1920",
          3: "1906",
          4: "1898",
        },
        correct_answer: 1,
        player1_answer: 1,
        player2_answer: 2,
      },
    ],
  };

  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalPlayer, setModalPlayer] = useState(null);

  const handleButtonClick = (question, player) => {
    setModalData(question);
    setOpenQuestionModal(true);
    setModalPlayer(player);
  };

  const getButtonColor = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      return "btn-success";
    } else {
      return "btn-danger";
    }
  };

  const chunkArray = (arr, size) => {
    const chunkedArr = [];
    for (let i = 0; i < arr.length; i += size) {
      chunkedArr.push(arr.slice(i, i + size));
    }
    return chunkedArr;
  };
  const questionsChunks = chunkArray(data.questions, 3);

  return (
    <div className="scoreboard container text-center">
      <h2 className="text-center mb-5">Scoreboard</h2>
      <div className="row">
        <div className="col border-end border-3 border-black">
          <h2 className="text-center mb-5">Spieler 1</h2>
        </div>
        <div className="col">
          <h2 className="text-center mb-5">Spieler 2</h2>
        </div>
      </div>
      <div className="">
        {questionsChunks.map((chunk, index) => (
          <div key={index} className="row">
            <div className="col border-end border-3 border-black">
              <div className="row">
                {chunk.map((question) => (
                  <div key={question.question_number} className="mb-3 col">
                    <GameButton
                      addClass={` ${getButtonColor(question.player1_answer, question.correct_answer)} w-50`}
                      onClick={() => handleButtonClick(question, "player1")}
                      label={question.question_number}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="col">
              <div className="row">
                {chunk.map((question) => (
                  <div key={question.question_number} className="mb-3 col">
                    <GameButton
                      addClass={` ${getButtonColor(question.player2_answer, question.correct_answer)} w-50`}
                      onClick={() => handleButtonClick(question, "player2")}
                      label={question.question_number}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <GameScoreboardModal
        modalData={modalData}
        openModal={openQuestionModal}
        setOpenModal={setOpenQuestionModal}
        player={modalPlayer}
      ></GameScoreboardModal>
    </div>
  );
};

export default GameScoreboard;
