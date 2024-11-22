import React, { useState, useEffect, useCallback } from "react";

const GameBoard = ({ config }) => {
  const [words, setWords] = useState([]);
  const [selected, setSelected] = useState([]);
  const [attempts, setAttempts] = useState(0);

  // Generate shuffled words based on group size and item count
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

    // Validate item count is divisible by group size
    if (config.itemCount % config.groupSize !== 0) {
      alert("Item count must be divisible by group size!");
      return;
    }

    const groupCount = config.itemCount / config.groupSize; // Number of unique groups
    const chosenWords = allWords.slice(0, groupCount); // Pick words for the groups
    const wordPool = [];

    // Duplicate words based on group size
    chosenWords.forEach((word) => {
      for (let i = 0; i < config.groupSize; i++) {
        wordPool.push(word);
      }
    });

    // Shuffle the pool of words
    const shuffled = wordPool.sort(() => Math.random() - 0.5);

    setWords(
      shuffled.map((word, index) => ({
        id: index,
        word,
        matched: false,
      }))
    );
  }, [config]);

  useEffect(() => {
    generateWords();
  }, [generateWords]);

  // Handle word selection and matching logic
  const handleWordClick = (wordObj) => {
    if (wordObj.matched || selected.length === config.groupSize) return;

    const newSelected = [...selected, wordObj];
    setSelected(newSelected);

    if (newSelected.length === config.groupSize) {
      setAttempts((prev) => prev + 1);

      // Check if all selected words are the same
      const isMatch = newSelected.every((sel) => sel.word === newSelected[0].word);
      if (isMatch) {
        setWords((prevWords) =>
          prevWords.filter((word) => !newSelected.some((sel) => sel.id === word.id))
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
          className={`word-card ${
            selected.some((sel) => sel.id === word.id) ? "selected" : ""
          }`}
          onClick={() => handleWordClick(word)}
        >
          {word.word}
        </div>
      ))}
      <div className="attempts">Attempts: {attempts}</div>
    </div>
  );
};

export default GameBoard;
