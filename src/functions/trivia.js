import triviaJson from "../trivia.json";

const triviaCheck = (rank, triviaIdx, correctCount) => {
  if (rank === triviaJson[triviaIdx].correct) {
    return {
      triviaJsonIndex: triviaIdx + 1,
      triviaCorrectCount: correctCount + 1,
      guessReceived: true,
      guessResponse: "You got it!"
    };
  } else {
    return {
      guessReceived: true,
      guessResponse: "Sorry, that's not right."
    };
  }
};
export default triviaCheck;
