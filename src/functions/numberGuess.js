const numberGuess = (userGuess, random, guesses, stageCount) => {
  // If the guess is correct
  if (userGuess === random) {
    return {
      history: "",
      initial: {
        instructions: "You got it!"
      },
      delayed: {
        stageCount: stageCount + 1,
        instructions: "Make your pick"
      },
      timeout: 3000
    };
  } else {
    // If guess is incorrect, make sure it's not the fourth guess
    if (guesses < 3) {
      if (userGuess < random) {
        return {
          history: `Higher than ${userGuess}`,
          initial: {
            instructions: "Higher!"
          }
        };
      } else {
        return {
          history: `Lower than ${userGuess}`,
          initial: {
            instructions: "Lower!"
          }
        };
      }
    } else {
      const randomNumber = Math.floor(Math.random() * 10) + 1;
      return {
        history: "",
        initial: {
          instructions: "Sorry, try again."
        },
        delayed: {
          instructions: "Pick a number",
          randomNumber
        },
        timeout: 1500
      };
    }
  }
};
export default numberGuess;
