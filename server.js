const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron");

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
app.post("/gameData", getGameData);
app.post("/categories", getCategories);
app.post("/commentCategories", getCommentCategories);
app.post("/updatePlayer1Answer", updatePlayer1Answer);
app.post("/updatePlayer2Answer", updatePlayer2Answer);
app.post("/accessToken", getAccessTokens);
app.post("/getThreeQuestionsByCat", getThreeQuestionsByCategory);
app.post("/createQuizInDB2", createQuizInDB);
app.post("/createNewRound", createNewRound);
app.post("/postComment", postComment);
app.post("/addQuestion", addQuestion);
app.post("/resetTrustIndex", resetTrustIndex);
app.post("/incrementTrustIndex", incrementTrustIndex);
app.post("/getQuestionsWithoutUser", getQuestionsWithoutUser);
app.post("/updateUserForQuestion", updateUserForQuestion);

// Route Handlers
function getGameData(req, res) {
  const { accessToken } = req.body;
  const query = `SELECT * FROM Quiz 
                 LEFT JOIN QuizQuestions ON Quiz.quizid = QuizQuestions.quizid 
                 LEFT JOIN Question ON QuizQuestions.questionid = Question.questionid
                 LEFT JOIN QuestionCategory ON Question.CategoryID = QuestionCategory.QuestionCategoryID
                 WHERE Quiz.AccessTokenOne = ? OR Quiz.AccessTokenTwo = ?`;
  connection.query(query, [accessToken, accessToken], handleQueryResponse(res));
}

function addQuestion(req, res) {
  const { questionText, answerA, answerB, answerC, answerD, category } = req.body;
  const query = `INSERT INTO Question (QuestionText, Answer1, Answer2, Answer3, CorrectAnswer, CategoryID) VALUES (?, ?, ?, ?, ?, ?)`;
  connection.query(query, [questionText, answerA, , answerB, answerC, answerD, category], handleQueryResponse(res));
}

function getQuestionsWithoutUser(req, res) {
  const query = `SELECT q.*, c.*
  FROM Question q
  LEFT JOIN (
      SELECT Comment.*, 
             ROW_NUMBER() OVER (PARTITION BY QuestionID ORDER BY CommentTimeStamp DESC) AS rn
      FROM Comment
  ) c ON q.QuestionID = c.QuestionID AND c.rn = 1
  WHERE q.UserID IS NULL;   
  `;
  connection.query(query, [], handleQueryResponse(res));
}

function resetTrustIndex(req, res) {
  const { questionID } = req.body;
  const query = `UPDATE Question SET TrustIndex = 0 WHERE QuestionID = ?`;
  connection.query(query, [questionID], handleQueryResponse(res));
}

function updateUserForQuestion(req, res) {
  const { userID, questionID } = req.body;
  const query = `UPDATE Question SET UserID = ? WHERE QuestionID = ?`;
  connection.query(query, [userID, questionID], handleQueryResponse(res));
}

function incrementTrustIndex(req, res) {
  const { questionID } = req.body;
  const query = `UPDATE Question SET TrustIndex = TrustIndex + 1 WHERE QuestionID = ?`;
  connection.query(query, [questionID], handleQueryResponse(res));
}

function getCategories(req, res) {
  const query = `SELECT qc.QuestionCategoryID, qc.Name
  FROM QuestionCategory qc
  JOIN Question q ON qc.QuestionCategoryID = q.CategoryID
  GROUP BY qc.QuestionCategoryID, qc.Name
  HAVING COUNT(q.QuestionID) >= 3;`;
  connection.query(query, handleQueryResponse(res));
}

function getCommentCategories(req, res) {
  const query = `SELECT * FROM CommentCategory`;
  connection.query(query, handleQueryResponse(res));
}

function getQuestionsWithoutReaction(req, res) {
  const query = `UPDATE Question q
  JOIN (
      SELECT DISTINCT q.QuestionID
      FROM Question q
      JOIN Comment c ON q.QuestionID = c.QuestionID
      WHERE c.CommentTimeStamp < DATE_SUB(NOW(), INTERVAL 2 WEEK)
      AND c.CategoryID IN (1, 2)
  ) AS subquery ON q.QuestionID = subquery.QuestionID
  SET q.UserID = NULL;`;
  connection.query(query, handleQueryResponse(res));
}

function updatePlayer1Answer(req, res) {
  const { answerGiven, quizID, questionNumber } = req.body;
  updatePlayerAnswer(res, answerGiven, quizID, questionNumber, "1");
}

function updatePlayer2Answer(req, res) {
  const { answerGiven, quizID, questionNumber } = req.body;
  updatePlayerAnswer(res, answerGiven, quizID, questionNumber, "2");
}

function updatePlayerAnswer(
  res,
  answerGiven,
  quizID,
  questionNumber,
  playerNumber,
) {
  const query = `UPDATE QuizQuestions SET AnswerPlayer${playerNumber} = ? WHERE QuizID = ? AND QuestionNumber = ?`;
  connection.query(
    query,
    [answerGiven, quizID, questionNumber],
    handleQueryResponse(res),
  );
}

function getAccessTokens(req, res) {
  const query = `SELECT AccessTokenOne, AccessTokenTwo FROM Quiz`;
  connection.query(query, handleQueryResponse(res));
}

function getThreeQuestionsByCategory(req, res) {
  const { categoryID } = req.body;
  const query = `SELECT QuestionID FROM Question
                 WHERE CategoryID = ${connection.escape(categoryID)}
                 ORDER BY RAND()
                 LIMIT 3`;
  connection.query(query, handleQueryResponse(res));
}

function createQuizInDB(req, res) {
  const { accessTokenOne, accessTokenTwo, rounds, timeToAnswer, q1, q2, q3 } =
    req.body;
  connection.beginTransaction((err) => {
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
          handleRollbackAndError(res, connection, "Error inserting quiz", err);
          return;
        }

        const quizId = results.insertId;

        const questionQueries = [];
        const questionsValues = [];
        for (let i = 1; i <= rounds * 3; i++) {
          questionQueries.push(
            "INSERT INTO QuizQuestions (QuizID, QuestionNumber) VALUES (?, ?)",
          );
          questionsValues.push([quizId, i]);
        }

        batchQuery(questionQueries, questionsValues, res, connection, (err) => {
          if (err) {
            handleRollbackAndError(
              res,
              connection,
              "Error adding quiz questions",
              err,
            );
            return;
          }

          const updateQueries = [
            "UPDATE QuizQuestions SET QuestionID = ? WHERE QuizID = ? AND QuestionNumber = 1",
            "UPDATE QuizQuestions SET QuestionID = ? WHERE QuizID = ? AND QuestionNumber = 2",
            "UPDATE QuizQuestions SET QuestionID = ? WHERE QuizID = ? AND QuestionNumber = 3",
          ];

          const updateValues = [
            [q1, quizId],
            [q2, quizId],
            [q3, quizId],
          ];

          batchQuery(updateQueries, updateValues, res, connection, (err) => {
            if (err) {
              handleRollbackAndError(
                res,
                connection,
                "Error updating quiz questions",
                err,
              );
              return;
            }

            connection.commit((err) => {
              if (err) {
                handleRollbackAndError(
                  res,
                  connection,
                  "Error committing transaction",
                  err,
                );
                return;
              }
              res.json({ message: "Quiz created successfully" });
            });
          });
        });
      },
    );
  });
}

function createNewRound(req, res) {
  const { quizID, questionNumber, q1, q2, q3 } = req.body;

  connection.beginTransaction((err) => {
    if (err) {
      console.error("Error beginning transaction: ", err);
      res.status(500).json({ error: "Error beginning transaction" });
      return;
    }

    const updateQueries = [
      "UPDATE QuizQuestions SET QuestionID = ? WHERE QuizID = ? AND QuestionNumber = ?",
      "UPDATE QuizQuestions SET QuestionID = ? WHERE QuizID = ? AND QuestionNumber = ?",
      "UPDATE QuizQuestions SET QuestionID = ? WHERE QuizID = ? AND QuestionNumber = ?",
    ];

    const updateValues = [
      [q1, quizID, questionNumber],
      [q2, quizID, questionNumber + 1],
      [q3, quizID, questionNumber + 2],
    ];

    batchQuery(updateQueries, updateValues, res, connection, (err) => {
      if (err) {
        handleRollbackAndError(
          res,
          connection,
          "Error updating quiz questions",
          err,
        );
        return;
      }

      connection.commit((err) => {
        if (err) {
          handleRollbackAndError(
            res,
            connection,
            "Error committing transaction",
            err,
          );
          return;
        }
        res.json({ message: "Quiz updated successfully" });
      });
    });
  });
}

function postComment(req, res) {
  const { questionID, text, categoryID } = req.body;
  const query =
    "INSERT INTO Comment (QuestionID, Text, CategoryID) VALUES ( ?, ?, ?)";
  connection.query(
    query,
    [questionID, text, categoryID],
    handleQueryResponse(res),
  );
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

function batchQuery(queries, values, res, connection, callback) {
  queries.forEach((query, index) => {
    connection.query(query, values[index], (err) => {
      if (err) {
        callback(err);
        return;
      }
      if (index === queries.length - 1) {
        callback(null);
      }
    });
  });
}

function handleRollbackAndError(res, connection, errorMessage, err) {
  console.error(errorMessage, err);
  connection.rollback(() => {
    res.status(500).json({ error: errorMessage });
  });
}

//clean up Code executed once a day by server at midnight
cron.schedule("0 0 * * *", () => {
  getQuestionsWithoutReaction();
});

// Start the server
const PORT = process.env.PORT || port;
app.listen(PORT, IP_ADDRESS, () => {
  console.log(`Server listening on ${IP_ADDRESS}:${PORT}`);
});
