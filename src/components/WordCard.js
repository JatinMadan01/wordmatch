import React from "react";

const WordCard = ({ word, onClick, isWrong }) => {
  const handleClick = () => {
    if (!word.matched) onClick(word);
  };

  return (
    <div
      className={`word-card ${word.matched ? "matched" : ""} ${isWrong ? "wrong" : ""}`}
      onClick={handleClick}
    >
      {word.text}
    </div>
  );
};

export default WordCard;
