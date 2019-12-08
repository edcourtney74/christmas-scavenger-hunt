const matchCheck = (
  first,
  second,
  correctCount,
  stageCount,
  jsonCount,
  group
) => {
  if ((first === second + 4 || first === second - 4) && correctCount < 3) {
    const groupId = `group${group}`;
    return {
      initial: {
        firstGuess: "",
        instructions: "You found it!",
        matchCorrectCount: correctCount + 1
      },
      delayed: {
        [groupId]: true,
        guessReceived: false,
        instructions: "Pick a card"
      },
      timeout: 1500
    };
  } else if (first === second + 4 || first === second - 4) {
    // The second guess was a match and all cards have been found...
    const groupId = `group${group}`;
    return {
      initial: {
        firstGuess: "",
        instructions: "You found them all!"
      },
      delayed: {
        [groupId]: true,
        guessReceived: false,
        stageCount: stageCount + 1,
        codeJsonCount: jsonCount + 1,
        card0: false,
        card1: false,
        card2: false,
        card3: false,
        card4: false,
        card5: false,
        card6: false,
        card7: false,
        instructions: "Click the cards in order of most expensive."
      },
      timeout: 3000
    };
  } else {
    // Second guess is not a match
    return {
      initial: {
        firstGuess: "",
        guessReceived: false,
        instructions: "Try again"
      },
      delayed: {
        instructions: "Pick a card",
        card0: false,
        card1: false,
        card2: false,
        card3: false,
        card4: false,
        card5: false,
        card6: false,
        card7: false
      },
      timeout: 1000
    };
  }
};
export default matchCheck;
