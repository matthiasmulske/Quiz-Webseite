const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const IP_ADDRESS = "localhost";
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database configuration
const connection = mysql.createConnection({
    host: "isef01-quiz.cxcheuy8ztxa.eu-north-1.rds.amazonaws.com",
    port: "3306",
    user: "admin",
    password: "#quizisef01",
    database: "quizapp",
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to database: ", err);
        return;
    }
    console.log("Connected to database.");
});

// Routes
app.get("/categories", getCategories);
app.post("/question", addQuestion);
app.get("/data", getData);
app.put("/updateQuestion", updateQuestion)

function updateQuestion(req, res) {
    const query = 'UPDATE Question SET Answer1 = 0 WHERE QuestionID = 9;'
    console.log(req.body)
}


function getCategories(req, res) {
    connection.query('SELECT * FROM QuestionCategory', handleQueryResponse(res));
}

function getData(req, res) {
    let selected_userId = req.headers.userid
    let query = `Select * From Question q
         JOIN QuestionCategory c on q.CategoryID = c.QuestionCategoryID
         Where UserID = '${selected_userId}'`
    connection.query(query, handleQueryResponse(res));
}


function addQuestion(req, res) {
    const { question, answerA, answerB, answerC, correctAnswer, selectedCategory } = req.body.data;
    const query = `INSERT INTO Question(QuestionText, Answer1, Answer2, Answer3, CorrectAnswer, CategoryID) VALUES ('${question}', '${answerA}', '${answerB}', '${answerC}', '${correctAnswer}', ${selectedCategory});`;
    console.log(req.body.data)
    //connection.query(query, handleQueryResponse(res));
}

// Utility Functions
function handleQueryResponse(res) {
    return (err, results) => {
        if (err) {
            console.error("Error executing query: ", err);
            res.status(500).json({ error: "Error executing query" });
            return;
        }
        res.json(results);
    };
}


// Start the server
const PORT = process.env.PORT || port;
app.listen(PORT, IP_ADDRESS, () => {
    console.log(`Server listening on ${IP_ADDRESS}:${PORT}`);
});
