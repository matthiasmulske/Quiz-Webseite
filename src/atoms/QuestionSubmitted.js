import React, { useState } from "react";

function QuestionSubmitted({ text }) {
  const [rendered, setRendered] = useState(false);
  console.log("Hello World");

  const handleButtonClick = () => {
    setRendered(true);
  };

  return (
    <div>
      <p>{text}</p>
    </div>
  );
}

export default QuestionSubmitted;
