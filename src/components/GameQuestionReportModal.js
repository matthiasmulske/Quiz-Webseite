import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import GameCategoryDropdown from "../atoms/GameCategoryDropdown";
import GameInput from "../atoms/GameInput";
import GameButton from "../atoms/GameButton";
import CommentIcon from "@mui/icons-material/Comment";
import domain from "./../assets/domain.js";
import { CircularProgress } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import {
  fetchCommentCategories,
  postComment,
  resetTrustIndex,
} from "../api.js";

const GameQuestionReportModal = ({
  question,
  questionID,
  openModal,
  setOpenModal,
  trustIndex,
}) => {
  const [category, setCategory] = useState(); //stores choosen CommentCategory
  const [categories, setCategories] = useState([]); //Stores CommentCategories for Dropdown-Input
  const [commentText, setCommentText] = useState(""); //stores comment of the user
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      let options = await fetchCommentCategories(
        domain.domain + "/Commentcategories",
        "",
      );
      let optionsArray = options.map((category) => ({
        value: category.CommentCategoryID,
        label: category.CommentCategoryName,
      }));
      return optionsArray;
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  //get categories from Database when component mounts
  useEffect(() => {
    getData();
     // eslint-disable-next-line 
  }, []);

  async function getData() {
    let options = await fetchCategories();
    setCategories(options);
  }

  const handleCloseModal = () => {
    setSent(false);
    setOpenModal(false); // Update openModal in the parent component so it closes correctly
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };
  async function handleSendComment() {
    setLoading(true);
    await postComment(
      domain.domain + "/postComment",
      questionID,
      commentText,
      category,
    );
    if (category === 1 || 2) {
      await resetTrustIndex(domain.domain + "/resetTrustIndex", questionID);
    }
    setLoading(false);
    setSent(true);
  }

  return (
    <Modal
      show={openModal}
      onHide={handleCloseModal}
      dialogClassName="modal-xl"
    >
      <Modal.Header closeButton>
        <Modal.Title>Frage melden </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-center container justify-content-center align-items-center mb-3">
          <div className="mb-3"><abbr style={{ textDecoration: 'underline' }}  title="Gibt an, wie oft eine Frage gespielt wurde, ohne gemeldet worden zu sein">Vertrauensindex: {trustIndex}</abbr > </div>
          <div className="mb-3">{question}</div>
          <GameCategoryDropdown
            label="Kategorie"
            options={categories}
            selectedOption={category}
            onChange={handleCategoryChange}
            isRequired={true}
          />
          <GameInput
            value={commentText}
            onChange={handleCommentTextChange}
            label="Kommentar"
            type="text"
            icon={<CommentIcon />}
            required={true}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        {sent ? (
          <DoneAllIcon />
        ) : (
          <>
            <GameButton onClick={() => handleSendComment()} label="Senden" />
            {loading ? <CircularProgress style={style.animation} /> : ""}
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default GameQuestionReportModal;
const style = {
  animation: {
    margin: "2rem",
  },
};
