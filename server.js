const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 5000;
const IP_ADDRESS = "192.168.188.39";
app.use(bodyParser.json());

// Create connection to the MySQL database
const connection = mysql.createConnection({
  host: "isef01-quiz.cxcheuy8ztxa.eu-north-1.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "#quizisef01",
  database: "quizapp",
});

const cors = require("cors");
app.use(cors());

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to database.");
});

// Define a route to fetch gameData
app.post("/gameData", (req, res) => {
  const { accessToken } = req.body;
  const query = `SELECT * 
                 FROM Quiz 
                 LEFT JOIN QuizQuestions ON Quiz.quizid = QuizQuestions.quizid 
                 LEFT JOIN Question ON QuizQuestions.questionid = Question.questionid
                 LEFT JOIN QuestionCategory ON Question.CategoryID = QuestionCategory.QuestionCategoryID
                 WHERE Quiz.AccessTokenOne = ? OR Quiz.AccessTokenTwo = ?`;
  connection.query(query, [accessToken, accessToken], (err, results) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ error: "Error retrieving game data" });
      return;
    }
    res.json(results);
  });
});

// Define a route to fetch categories
app.post("/categories", (req, res) => {
  const query = `SELECT * FROM QuestionCategory`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ error: "Error retrieving categories" });
      return;
    }
    res.json(results);
  });
});

// Define a route to fetch Commentcategories
app.post("/Commentcategories", (req, res) => {
  const query = `SELECT * FROM CommentCategory`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ error: "Error retrieving categories" });
      return;
    }
    res.json(results);
  });
});

// Define routes to set a player's answer
app.post("/updatePlayer1Answer", (req, res) => {
  const { answerGiven, quizID, questionNumber } = req.body;
  const query =
    "UPDATE QuizQuestions SET  AnswerPlayer1 = ? WHERE QuizID = ? AND QuestionNumber = ?";
  connection.query(
    query,
    [answerGiven, quizID, questionNumber],
    (err, results) => {
      if (err) {
        console.error("Error executing query: ", err);
        res.status(500).json({ error: "Error updating player answer" });
        return;
      }
      res.json(results);
    }
  );
});

app.post("/updatePlayer2Answer", (req, res) => {
  const { answerGiven, quizID, questionNumber } = req.body;
  const query =
    "UPDATE QuizQuestions SET  AnswerPlayer2 = ? WHERE QuizID = ? AND QuestionNumber = ?";
  connection.query(
    query,
    [answerGiven, quizID, questionNumber],
    (err, results) => {
      if (err) {
        console.error("Error executing query: ", err);
        res.status(500).json({ error: "Error updating player answer" });
        return;
      }
      res.json(results);
    }
  );
});

//Define a Route to get all existing accesstokens
app.post("/accessToken", (req, res) => {
  const query = `SELECT AccessTokenOne, AccessTokenTwo FROM Quiz`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ error: "Error retrieving categories" });
      return;
    }
    res.json(results);
  });
});

//Define a Route to get 3 questions of a specific Category
app.post("/getThreeQuestionsByCat", (req, res) => {
  const { categoryID } = req.body;
  const query = `SELECT QuestionID FROM Question
  WHERE CategoryID = ${connection.escape(categoryID)}
  ORDER BY RAND()
  LIMIT 3`;
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing query: ", err);
      res.status(500).json({ error: "Error retrieving questions" });
      return;
    }
    res.json(results);
  });
});

app.post("/createQuizInDB2", (req, res) => {
  const { accessTokenOne, accessTokenTwo, rounds, timeToAnswer, q1, q2, q3 } = req.body;

  // Insert Quiz
connection.beginTransaction(err => {
  if (err) {
    console.error("Error beginning transaction: ", err);
    res.status(500).json({ error: "Error beginning transaction" });
    return;
  }

  connection.query(
    "INSERT INTO Quiz (AccessTokenOne, AccessTokenTwo, Rounds, TimeToAnswer) VALUES (?, ?, ?, ?)",
    [accessTokenOne, accessTokenTwo, rounds, timeToAnswer],
    (err, results) => {
      if (err) {
        console.error("Error inserting quiz: ", err);
        connection.rollback(() => {
          res.status(500).json({ error: "Error creating quiz" });
        });
        return;
      }

      const quizId = results.insertId;

      // Insert QuizQuestions
      const questionQueries = [];
      const questionsValues = [];
      for (let i = 1; i <= rounds * 3; i++) {
        questionQueries.push("INSERT INTO QuizQuestions (QuizID, QuestionNumber) VALUES (?, ?)");
        questionsValues.push([quizId, i]);
      }

      // Execute each query separately
      questionQueries.forEach((query, index) => {
        connection.query(query, questionsValues[index], (err, results) => {
          if (err) {
            console.error("Error adding quiz questions: ", err);
            connection.rollback(() => {
              res.status(500).json({ error: "Error adding quiz questions" });
            });
            return;
          }
          // Handle successful insert if needed
        });
      });

      // Update QuizQuestions
      const updateQueries = [
        "UPDATE QuizQuestions SET QuestionID = ? WHERE QuizID = ? AND QuestionNumber = 1",
        "UPDATE QuizQuestions SET QuestionID = ? WHERE QuizID = ? AND QuestionNumber = 2",
        "UPDATE QuizQuestions SET QuestionID = ? WHERE QuizID = ? AND QuestionNumber = 3"
      ];
      const updateValues = [
        [q1, quizId], // Values for the first query
        [q2, quizId], // Values for the second query
        [q3, quizId]  // Values for the third query
      ];

      // Execute each query separately
      updateQueries.forEach((query, index) => {
        connection.query(query, updateValues[index], (err, results) => {
          if (err) {
            console.error("Error updating quiz questions: ", err);
            connection.rollback(() => {
              res.status(500).json({ error: "Error updating quiz questions" });
            });
            return;
          }
          // Handle successful update if needed
        });
      });

      // Commit the transaction
      connection.commit(err => {
        if (err) {
          console.error("Error committing transaction: ", err);
          connection.rollback(() => {
            res.status(500).json({ error: "Error committing transaction" });
          });
          return;
        }

        // Transaction successfully committed
        res.json({ message: "Quiz created successfully" });
      });
    }
  );
});

});

// Set Questions for new Round
app.post("/createNewRound", (req, res) => {
  const { quizID, questionNumber, q1, q2, q3 } = req.body;


connection.beginTransaction(err => {
  if (err) {
    console.error("Error beginning transaction: ", err);
    res.status(500).json({ error: "Error beginning transaction" });
    return;
  }

      // Update QuizQuestions
      const updateQueries = [
        "UPDATE QuizQuestions SET QuestionID = ? WHERE QuizID = ? AND QuestionNumber = ?",
        "UPDATE QuizQuestions SET QuestionID = ? WHERE QuizID = ? AND QuestionNumber = ?",
        "UPDATE QuizQuestions SET QuestionID = ? WHERE QuizID = ? AND QuestionNumber = ?"
      ];
      const updateValues = [
        [q1, quizID, questionNumber], // Values for the first query
        [q2, quizID, questionNumber+1], // Values for the second query
        [q3, quizID, questionNumber+2]  // Values for the third query
      ];

      // Execute each query separately
      updateQueries.forEach((query, index) => {
        connection.query(query, updateValues[index], (err, results) => {
          if (err) {
            console.error("Error updating quiz questions: ", err);
            connection.rollback(() => {
              res.status(500).json({ error: "Error updating quiz questions" });
            });
            return;
          }
          // Handle successful update if needed
        });
      });

      // Commit the transaction
      connection.commit(err => {
        if (err) {
          console.error("Error committing transaction: ", err);
          connection.rollback(() => {
            res.status(500).json({ error: "Error committing transaction" });
          });
          return;
        }

        // Transaction successfully committed
        res.json({ message: "Quiz updated successfully" });
      });
    }
  );
});

// Define routes to post a comment
app.post("/postComment", (req, res) => {
  const {questionID, text, categoryID, userID} = req.body;
  const query =
  "INSERT INTO Comment (UserID, QuestionID, Text, CategoryID) VALUES (?, ?, ?, ?)";
  connection.query(
    query,
    [userID, questionID, text, categoryID],
    (err, results) => {
      if (err) {
        console.error("Error executing query: ", err);
        res.status(500).json({ error: "Error posting comment" });
        return;
      }
      res.json(results);
    }
  );
});









// Start the server
const PORT = process.env.PORT || port;
app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server listening on ${IP_ADDRESS}:${PORT}`);
});