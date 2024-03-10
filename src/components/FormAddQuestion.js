import * as React from "react";
import {FormControl, InputLabel, Select} from "@mui/material";
import QuizTextField from "../atoms/QuizTextField";
import ButtonQuiz from "../atoms/ButtonQuiz";
import {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";

const domain = "http://localhost:5000";
const route = domain + "/categories";


function FormAddQuestion({ buttonLabel, children }) {
    let [categories, setCategories] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Betriebssysteme");
    const [data, setData] = useState({
      question: "",
      answerA: "",
      answerB: "",
      answerC: "",
      answerD: "",
      category: ""
    });


    useEffect(() => {
        const fetchData = async () => {
            categories = await fetch(route, {method: "GET", headers: {"Content-Type": "application/json"}})
                .then(r => r.json())
                .catch(error => { console.error('Error fetching categories:', error) });
        }
        fetchData().then(r => setCategories(categories));
    })

    const handleDropdownChange = (event) => {
        const {target: { value }, } = event;
        setSelectedCategory(value)
    };


    function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit() {
      console.log(selectedCategory)
      console.log(data)
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
          <InputLabel>Kategorie</InputLabel>
          <div>
              {categories != null ? (
                  <Select
                      value={selectedCategory}
                      label={selectedCategory}
                      onChange={handleDropdownChange}
                  >
                      {categories.map((category) =>
                          <MenuItem
                              key={category.Name}
                              value={category.Name}
                          >{category.Name}</MenuItem>)}
                  </Select>

              ) : (console.log("Loading"))}
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
