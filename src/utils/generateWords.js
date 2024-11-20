const generateWords = (numPairs) => {
    const words = ["apple", "banana", "cherry", "date", "fig", "grape", "kiwi", "lemon","lichi","watermelon"];
    const selectedWords = words.slice(0, numPairs);
    const pairs = [...selectedWords, ...selectedWords]
      .map((text, id) => ({ id, text, matched: false }))
      .sort(() => Math.random() - 0.5);
    return pairs;
  };
  
  export default generateWords;
  