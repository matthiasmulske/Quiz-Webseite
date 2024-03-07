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
  return await fetchData(`${domain.domain}:5000/gameData`, { accessToken });
};

const setNewRound = async (route, quizID, questionNumber, q1, q2, q3) => {
  return await fetchData(route, { quizID, questionNumber, q1, q2, q3 });
};

const postComment = async (route, questionID, text, categoryID, userID) => {
  return await fetchData(route, { questionID, text, categoryID, userID });
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
};
