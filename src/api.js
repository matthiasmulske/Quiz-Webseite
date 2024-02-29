// api.js

const fetchQuestionCategories = async (route, accessToken) => {
    try {
      const response = await fetch(route, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken: accessToken }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  
  export { fetchQuestionCategories };

  const checkAccessToken = async (route, accessToken1, accessToken2) => {
    try {
      const response = await fetch(route, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
  
      const data = await response.json();
      console.log(data);
      for (const obj of data) {
        // Check if the access token exists in the current object
        if (obj.AccessTokenOne === accessToken1 || obj.AccessTokenTwo === accessToken1) {
          return false; // token already in db
        }
        if(accessToken2!=null){
          if (obj.AccessTokenOne === accessToken2 || obj.AccessTokenTwo === accessToken2) {
            return false; // token already in db
          }
        }
      }
      return true; //token not in db
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  
  export { checkAccessToken };

  const getThreeQuestionsByCat = async (route, categoryID) => {
    try {
      const response = await fetch(route, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryID: categoryID }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
  
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  
  export { getThreeQuestionsByCat };

  const createQuizInDB = async (route, accessTokenOne, accessTokenTwo, rounds, timeToAnswer, q1,q2,q3) => {
    try {
      const response = await fetch(route, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessTokenOne: accessTokenOne, accessTokenTwo:accessTokenTwo, rounds:rounds, timeToAnswer:timeToAnswer, q1:q1,q2:q2,q3:q3 }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create Quiz');
      }
  
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  
  export { createQuizInDB };

  const fetchData = async (accessToken) => {
    console.log(accessToken);
    try {
      const response = await fetch("http://localhost:5000/gameData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken: accessToken }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  export { fetchData };