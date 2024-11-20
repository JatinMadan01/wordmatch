import React, { useState, useEffect, useCallback } from "react";

const GameBoard = ({ config }) => {
  const [words, setWords] = useState([]);
  const [selected, setSelected] = useState([]);
  const [attempts, setAttempts] = useState(0);

  // Memoize generateWords to prevent recreation on every render
  const generateWords = useCallback(() => {
    const allWords = [
      "apple",
      "banana",
      "cherry",
      "date",
      "elderberry",
      "fig",
      "grape",
      "honeydew",
      "lichi",
      "watermelon",
    ];
    const chosenWords = allWords.slice(0, config.itemCount / config.groupSize);
    const shuffled = [...chosenWords, ...chosenWords].sort(() => Math.random() - 0.5);
    setWords(shuffled.map((word, index) => ({ id: index, word, matched: false })));
  }, [config]);

  // Run generateWords when component mounts or config changes
  useEffect(() => {
    generateWords();
  }, [generateWords]);

  const handleWordClick = (wordObj) => {
    if (wordObj.matched || selected.length === 2) return;

    const newSelected = [...selected, wordObj];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setAttempts((prev) => prev + 1);
      if (newSelected[0].word === newSelected[1].word) {
        setWords((prevWords) =>
          prevWords.map((word) =>
            newSelected.some((sel) => sel.id === word.id) ? { ...word, matched: true } : word
          )
        );
        setSelected([]);
      } else {
        setTimeout(() => setSelected([]), 1000);
      }
    }
  };

  return (
    <div className="game-board" style={{ gridTemplateColumns: `repeat(${config.columns}, 1fr)` }}>
      {words.map((word) => (
        <div
          key={word.id}
          className={`word-card ${word.matched ? "matched" : ""} ${
            selected.some((sel) => sel.id === word.id) ? "selected" : ""
          }`}
          onClick={() => handleWordClick(word)}
        >
          {word.word} {/* Display the word */}
        </div>
      ))}
      <div className="attempts">Attempts: {attempts}</div>
    </div>
  );
};

export default GameBoard;
