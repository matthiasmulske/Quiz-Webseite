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
app.get("/getQuestions", getQuestions);
app.get("/getComments", getComments);
app.put("/updateQuestion", updateQuestion)
app.get("/deleteComment", deleteComment)

function deleteComment(req, res){
    //let comment = req.body.data.comment
    //const query = 'DELETE FROM Comment WHERE Text = ${comment}'
    console.log(req.headers.id)
}

function updateQuestion(req, res) {
    const query = 'UPDATE Question SET Answer1 = 0 WHERE QuestionID = 9;'
    console.log(req.body)
}


function getCategories(req, res) {
    connection.query('SELECT * FROM QuestionCategory', handleQueryResponse(res));
}

function getQuestions(req, res) {
    let selected_userId = req.headers.id
    let query =
        `SELECT * FROM Comment c 
    INNER JOIN Question q ON c.QuestionID = q.QuestionID 
         WHERE q.UserID = 3 
         GROUP BY q.QuestionID, q.QuestionText;`
    connection.query(query, handleQueryResponse(res));
}

function getComments(req, res) {
    let query = `SELECT * FROM Comment`;
    connection.query(query, handleQueryResponse(res));
}


function addQuestion(req, res) {
    const answer1 = req.body.data["Answer1"]
    const answer2 = req.body.data["Answer2"]
    const answer3 = req.body.data["Answer3"]
    const correctAnswer = req.body.data["CorrectAnswer"]
    const questionText = req.body.data["QuestionText"]
    const selectedCategory = req.body.data["Category"]

    const query = `INSERT INTO Question(QuestionText, Answer1, Answer2, Answer3, CorrectAnswer, CategoryID) VALUES ('${questionText}', '${answer1}', '${answer2}', '${answer3}', '${correctAnswer}', ${selectedCategory});`;
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