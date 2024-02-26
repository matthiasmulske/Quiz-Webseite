const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 5000;
app.use(bodyParser.json());

// Create connection to the MySQL database
const connection = mysql.createConnection({
  host: 'isef01-quiz.cxcheuy8ztxa.eu-north-1.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: '#quizisef01',
  database: 'quizapp'
});

const cors = require('cors');
app.use(cors());

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to database: ', err);
    return;
  }
  console.log('Connected to database.');
});

// Define a route to fetch gameData
app.post('/gameData', (req, res) => {
  const { accessToken } = req.body;
  const query = `SELECT * 
                 FROM Quiz 
                 JOIN QuizQuestions ON Quiz.quizid = QuizQuestions.quizid 
                 JOIN Question ON QuizQuestions.questionid = Question.questionid
                 JOIN QuestionCategory ON Question.CategoryID = QuestionCategory.QuestionCategoryID
                 WHERE Quiz.AccessTokenOne = ? OR Quiz.AccessTokenTwo = ?`;
  connection.query(query, [accessToken, accessToken], (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Error retrieving game data' });
      return;
    }
    res.json(results);
  });
});

// Define a route to fetch categories
app.post('/categories', (req, res) => {
  const query = `SELECT * FROM QuestionCategory`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query: ', err);
      res.status(500).json({ error: 'Error retrieving categories' });
      return;
    }
    res.json(results);
  });
});













// Start the server
const PORT = process.env.PORT || port;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});



