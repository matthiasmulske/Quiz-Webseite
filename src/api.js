// api.js

const fetchData = async (route, saveData, accessToken, updateState) => {
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
      saveData(data);
      updateState(true);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  
  export { fetchData };