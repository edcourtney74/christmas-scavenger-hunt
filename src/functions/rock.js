const getComputerPick = () => {
  const rockNumber = Math.floor(Math.random() * 3);
  if (rockNumber === 0) {
    return "Rock";
  } else if (rockNumber === 1) {
    return "Paper";
  } else {
    return "Scissors";
  }
};

const compareRock = (userPick, wins, losses) => {
  const compPick = getComputerPick();
  let result;
  let stateObj;
  if (userPick === compPick) {
    result = "tie";
  } else if (userPick === "Rock") {
    result = compPick === "Paper" ? "loss" : "win";
  } else if (userPick === "Paper") {
    result = compPick === "Rock" ? "win" : "loss";
  } else if (userPick === "Scissors") {
    result = compPick === "Rock" ? "loss" : "win";
  }
  if (result === "tie") {
    stateObj = {
      instructions: `You both picked ${userPick}.`,
      compRock: compPick,
      result
    };
  } else if (result === "win") {
    stateObj = {
      result,
      compRock: compPick,
      instructions: `You won!`,
      userWins: wins + 1
    };
  } else {
    stateObj = {
      result,
      compRock: compPick,
      instructions: `You lost!`,
      userLosses: losses + 1
    };
  }
  return stateObj;
};
export default compareRock;
