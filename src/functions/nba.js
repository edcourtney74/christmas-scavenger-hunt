const nbaAnswer = ["jordan", "lebron", "kobe", "barkley", "wade"];

const compareNba = selected => {
  let correct = 0;
  selected.forEach((player, index) => {
    if (player === nbaAnswer[index]) {
      correct++;
    }
  });
  return correct;
};

const nbaSubmit = (selected, stageCount) => {
  const nbaCorrect = compareNba(selected);
  if (nbaCorrect === 5) {
    return {
      initial: {
        instructions: "You got it!"
      },
      delayed: {
        stageCount: stageCount + 1,
        instructions: "Pick a number between 1 and 10."
      },
      timeout: 3000
    };
  } else {
    return {
      initial: {
        instructions: `You got ${nbaCorrect} correct. Try again!`,
        btnDisabled: true
      },
      delayed: {
        instructions: "Click the cards in order of most expensive.",
        card0: false,
        card1: false,
        card2: false,
        card3: false,
        card4: false
      },
      timeout: 3000
    };
  }
};
export default nbaSubmit;
