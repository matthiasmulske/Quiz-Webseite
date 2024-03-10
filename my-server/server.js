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
app.post("/categories", getCategories);
app.get("/categories", getCategories);


function getCategories(req, res) {
    const query = `SELECT * FROM QuestionCategory`;
    connection.query('SELECT * FROM QuestionCategory', handleQueryResponse(res));
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
