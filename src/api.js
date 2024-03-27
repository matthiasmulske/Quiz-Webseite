// api.js
import domain from "./assets/domain.js";

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

const fetchQuestionCategories = async (route, accessToken) => {
  return await fetchData(route, { accessToken });
};


const postAddQuestion = async (route,  questionText, answerA, answerB, answerC, answerD, category) => {
  return await fetchData(route, {  questionText, answerA, answerB, answerC, answerD, category });
};

const updateQuestion = async (route,  question) => {
  return await fetchData(route, {question});
};

const deleteComment = async (route,  commentID) => {
  return await fetchData(route, {commentID});
};

const resetTrustIndex = async (route,  questionID) => {
  return await fetchData(route, {  questionID });
};

const getNumberofMessages = async (route,  userID) => {
  return await fetchData(route, {  userID });
};

const getQuestionsForEdit = async (route,  userID) => {
  return await fetchData(route, {  userID });
};

const updateUserForQuestion = async (route,  userID, questionID) => {
  return await fetchData(route, {  userID, questionID });
};

const incrementTrustIndex = async (route,  questionID) => {
  return await fetchData(route, {  questionID });
};

const fetchCommentCategories = async (route, accessToken) => {
  return await fetchData(route, { accessToken });
};

const checkAccessToken = async (route, accessToken1, accessToken2) => {
  try {
    const data = await fetchData(route);
    for (const obj of data) {
      if (
        obj.AccessTokenOne === accessToken1 ||
        obj.AccessTokenTwo === accessToken1
      ) {
        return false;
      }
      if (
        accessToken2 &&
        (obj.AccessTokenOne === accessToken2 ||
          obj.AccessTokenTwo === accessToken2)
      ) {
        return false;
      }
    }
    return true;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

const getThreeQuestionsByCat = async (route, categoryID) => {
  return await fetchData(route, { categoryID });
};

const createQuizInDB = async (
  route,
  accessTokenOne,
  accessTokenTwo,
  rounds,
  timeToAnswer,
  q1,
  q2,
  q3,
) => {
  return await fetchData(route, {
    accessTokenOne,
    accessTokenTwo,
    rounds,
    timeToAnswer,
    q1,
    q2,
    q3,
  });
};

const fetchGameInfo = async (accessToken) => {
  return await fetchData(`${domain.domain}/gameData`, { accessToken });
};

const setNewRound = async (route, quizID, questionNumber, q1, q2, q3) => {
  return await fetchData(route, { quizID, questionNumber, q1, q2, q3 });
};

const postComment = async (route, questionID, text, categoryID) => {
  return await fetchData(route, { questionID, text, categoryID});
};

const getQuestionsWithoutUser = async (route) => {
  return await fetchData(route);
};

export {
  fetchQuestionCategories,
  fetchCommentCategories,
  checkAccessToken,
  getThreeQuestionsByCat,
  createQuizInDB,
  fetchGameInfo,
  setNewRound,
  postComment,
  postAddQuestion,
  resetTrustIndex,
  incrementTrustIndex,
  getQuestionsWithoutUser,
  updateUserForQuestion,
  getNumberofMessages,
  getQuestionsForEdit,
  updateQuestion,
  deleteComment,
  
};
