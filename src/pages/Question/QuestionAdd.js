import * as React from "react";
import FormAddQuestion from "../../components/QuestionAddForm.js";
import { useState, useEffect } from "react";
import { Alert } from "@mui/material";
import domain from "../../assets/domain.js";

let defaultState = {
  QuestionText: "",
  Answer1: "",
  Answer2: "",
  Answer3: "",
  CorrectAnswer: "",
  Category: "",
};

function AddQuestion({ userID }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [data, setData] = useState(defaultState);

  function handleDropDownChange(e) {
    setData({
      ...data,
      // eslint-disable-next-line
      ["Category"]: e.target.value,
    });
    setSelectedCategory(e.target.value);
  }

  function handleTextChange(e) {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function validateData() {
    const requiredKeys = [
      "Answer1",
      "QuestionText",
      "Answer2",
      "Answer3",
      "CorrectAnswer",
    ];
    const seenValues = [];
    console.log(data);

    for (const key of requiredKeys) {
      console.log(key);
      if (
        !data.hasOwnProperty(key) ||
        typeof data[key] !== "string" ||
        data[key].trim() === ""
      ) {
        setSeverity("error");
        setSubmitMessage("Du musst alle Felder ausfüllen");
        setShowMessage(true);
        return;
      }
      const value = data[key].trim();

      if (seenValues.includes(value)) {
        setSubmitMessage(
          "Eingegebene Daten dürfen nicht identisch sein: " + value,
        );
        setSeverity("error");
        setShowMessage(true);
        return;
      }

      seenValues.push(value);
    }
    setSeverity("success");
  }

  async function handleSubmit() {
    setShowMessage(false);
    validateData();
    resolveData();
  }

  
  useEffect(() => {
    if (severity === "success") {
      postToDatabase();
      setSubmitMessage("Frage wurde erfolgreich dem Pool hinzugefügt");
      setSeverity("success");
      setShowMessage(true);
    }
     // eslint-disable-next-line 
  }, [severity]);

  function resolveData() {
    console.log("User" + userID);
    setData({
      ...data,
      Category: selectedCategory,
      UserID: userID,
    });
  }

  async function postToDatabase() {
    try {
      const request = await fetch(domain.domain + "/question", {
        method: "POST",
        body: JSON.stringify({
          data,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!request.ok) {
        throw new Error("Failed to post question");
      }

      return request.json();
    } catch (error) {
      console.error("Error posting to Database:", error);
      throw error;
    }
  }

  return (
    <>
      <h1 style={style.header}>Füge eine Frage hinzu</h1>
      <div style={style.componentContainer}>
        <FormAddQuestion
          onTextChange={handleTextChange}
          onClick={handleSubmit}
          onDropDownChange={handleDropDownChange}
          buttonLabel={"Frage einreichen"}
          selectedCategory={selectedCategory}
          defaultValues={data}
        />

        {showMessage && <Alert severity={severity}>{submitMessage}</Alert>}
      </div>
    </>
  );
}

export default AddQuestion;

const style = {
  header: {
    textAlign: "center",
    paddingTop: 10,
    marginTop: "2rem"
  },

  componentContainer: {
    width: "100%",
  },
};
