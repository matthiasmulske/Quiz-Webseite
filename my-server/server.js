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
    console.log("oui")
    connection.query('SELECT * FROM QuestionCategory', handleQueryResponse(res));
}

function getData(req, res) {
    let query = "SELECT * FROM Question"
    connection.query(query, handleQueryResponse(res));
}

function addQuestion(req, res){
    console.log("hun")
    let query = "INSERT INTO Question(QuestionText,Answer1,Answer2,Answer3,CorrectAnswer,CategoryID) VALUES ('value_17','value_1','value_2','value_3','value',1);"
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
