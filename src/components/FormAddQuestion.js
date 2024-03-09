import * as React from "react";
import { FormControl, InputLabel } from "@mui/material";
import QuizTextField from "../atoms/QuizTextField";
import DropDown from "../atoms/DropDown";
import ButtonQuiz from "../atoms/ButtonQuiz";
import {useEffect, useState} from "react";
import questions from "../data/questions.json"
import {fetchQuestionCategories} from "../api";


const ip = "localhost";
const domain = "http://" + ip;

function FormAddQuestion({ buttonLabel, children }) {
  const [data, setData] = useState({
      question: "",
      answerA: "",
      answerB: "",
      answerC: "",
      answerD: "",
      category: ""
  });
  const [categories, setCategories] = useState()

    const fetchCategories = async () => {
        try {
            console.log(domain);
            let options = await fetchQuestionCategories(
                domain + ":5000/categories",
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

    const fetchQuestionCategories = async (route, accessToken) => {
        return await fetchData(route, { accessToken });
    };

    const fetchData = async (route, body) => {
        try {
            const response = await fetch(route, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }

            return await response.json();
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    //get categories from Database when component mounts
    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        let options = await fetchCategories();
        setCategories(options);
    }


    function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit() {
      console.log(categories)
  }


  return (
    <div style={style.container}>
      <QuizTextField name={'question'} value={data.question} label={"Frage"} onChange={handleChange} rows={5} />
      <div style={style.gridContainer}>
          <QuizTextField name={"answerA"} label={"Antwort A"} onChange={handleChange} rows={3}>{children}</QuizTextField>
        <QuizTextField name={"answerB"} label={"Antwort B"} onChange={handleChange} rows={3} />
        <QuizTextField name={"answerC"} label={"Antwort C"} onChange={handleChange} rows={3} />
        <QuizTextField name={"answerD"} label={"Antwort D"} onChange={handleChange} rows={3} />
      </div>
      <FormControl style={style.gridContainer}>
        <div>
          <InputLabel id="demo-simple-select-label">Kategorie</InputLabel>
          <DropDown categories={categories} />
        </div>
        <QuizTextField label={"neue Kategorie eingeben"} />
      </FormControl>
      <ButtonQuiz onButtonClick={handleSubmit} buttonLabel={buttonLabel}/>
    </div>
  );
}

export default FormAddQuestion;

const style = {
  container: {
    margin: "10%",
  },

  gridContainer: {
    display: "grid",
    gridAutoFlow: "row",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridColumnGap: "20px",
  },

  formControlContainer: {
    display: "flex",
    alignContent: "space-between",
  },


};
