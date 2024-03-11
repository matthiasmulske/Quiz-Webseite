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


function getCategories(req, res) {
    connection.query('SELECT * FROM QuestionCategory', handleQueryResponse(res));
}

function getData(req, res) {
    let query = "SELECT * FROM Question"
    connection.query(query, handleQueryResponse(res));
}

function addQuestion(req, res) {
    var questionText = req.body.data.question;
    var answerA = req.body.data.answerA;
    var answerB = req.body.data.answerB;
    var answerC = req.body.data.answerC;
    var correctAnswer = req.body.data.correctAnswer; // Corrected variable name
    var selectedCategory = 1

    let query = `INSERT INTO Question(QuestionText, Answer1, Answer2, Answer3, CorrectAnswer, CategoryID) VALUES ('${questionText}', '${answerA}', '${answerB}', '${answerC}', '${correctAnswer}', ${selectedCategory});`;
    console.log(query)
    connection.query(query, handleQueryResponse(res));
}

function addQuestion2(req, res) {
    const { question, answerA, answerB, answerC, answerD: correctAnswer } = req.body.data;
    const query = `INSERT INTO Question(QuestionText, Answer1, Answer2, Answer3, CorrectAnswer, CategoryID) VALUES ('${question}', '${answerA}', '${answerB}', '${answerC}', '${correctAnswer}', 1);`;

    connection.query(query, handleQueryResponse(res));
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
