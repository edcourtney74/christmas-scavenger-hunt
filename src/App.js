import React from "react";
import "./App.css";
import Container from "./components/Container";
import MainStart from "./components/MainStart";
import PlayerStart from "./components/PlayerStart";
import Trivia from "./components/Trivia";
import Match from "./components/Princesses";
import NBA from "./components/NBA";
import NumberGuess from "./components/NumberGuess";
import Rock from "./components/Rock";
import SecretCode from "./components/SecretCode";
import Final from "./components/Final";

import triviaCheck from "./functions/trivia";
import { princesses, shuffle } from "./functions/shuffle";
import matchCheck from "./functions/match";
import nbaSubmit from "./functions/nba";
import numberGuess from "./functions/numberGuess";
import compareRock from "./functions/rock";

import triviaJson from "./trivia.json";
import codeJson from "./secretCode.json";

class App extends React.Component {
  state = {
    player: "Lainey",
    stageCount: 8,
    codeJsonCount: 0,
    guessReceived: false,
    guessResponse: "",
    btnDisabled: true,
    instructions: "Pick a card",

    // Trivia variables
    triviaJsonIndex: 0,
    triviaCorrectCount: 0,

    // Match variables (cards, matchMessage also used for NBA)
    shuffled: [],
    firstGuess: "",
    matchCorrectCount: 0,
    card0: false,
    card1: false,
    card2: false,
    card3: false,
    card4: false,
    card5: false,
    card6: false,
    card7: false,
    group0: false,
    group1: false,
    group2: false,
    group3: false,

    // NBA variables
    nbaSelected: [],

    // Number guess variables
    randomNumber: 0,
    numberHistory: [],

    // Rock variables
    userWins: 0,
    userLosses: 0,
    userRock: "",
    compRock: "",
    subInstructions: "",

    // Secret code variables
    codeJsonIndex: 0,
    letter: "",
    number: "",
    codeMessage: ""
  };

  stageOrder = [
    "MainStart",
    "PlayerStart",
    "Trivia",
    "SecretCode",
    "PlayerStart",
    "Trivia",
    "SecretCode",
    "PlayerStart",
    "Princesses",
    "SecretCode",
    "PlayerStart",
    "NBA",
    "SecretCode",
    "PlayerStart",
    "NumberGuess",
    "SecretCode",
    "PlayerStart",
    "Rock",
    "SecretCode",
    "Final"
  ];

  nbaSelected = [];

  numberHistory = [];

  playerToggle() {
    if (this.state.player === "Lainey") {
      this.setState({ player: "Ethan" });
    } else {
      this.setState({ player: "Lainey" });
    }
  }

  handleMainClick = event => {
    event.preventDefault();
    this.setState({
      stageCount: this.state.stageCount + 1
    });
  };

  handleMessageClick = event => {
    event.preventDefault();
    this.playerToggle();
    this.setState({
      stageCount: this.state.stageCount + 1
    });
  };

  handleTriviaClick = event => {
    event.preventDefault();
    const rank = parseInt(event.target.dataset.rank);
    const triviaResult = triviaCheck(
      rank,
      this.state.triviaJsonIndex,
      this.state.triviaCorrectCount
    );
    triviaResult.guessResponse === "You got it!"
      ? this.playCorrect()
      : this.playWrong();
    this.setState(triviaResult);

    setTimeout(() => {
      this.state.triviaCorrectCount === 3
        ? this.setState({
            guessReceived: false,
            stageCount: this.state.stageCount + 1,
            triviaCorrectCount: 0
          })
        : this.setState({
            guessReceived: false
          });
    }, 3000);
  };

  handlePrincessesClick = event => {
    event.preventDefault();
    const cardGuess = parseInt(event.target.dataset.card);
    const cardId = `card${cardGuess}`;
    this.setState({ [cardId]: true });

    // If a first guess was just made
    if (!this.state.guessReceived) {
      this.setState({
        firstGuess: cardGuess,
        guessReceived: true,
        instructions: "Find the matching princess"
      });
      this.playPick();
    } else {
      const { initial, delayed, timeout } = matchCheck(
        this.state.firstGuess,
        cardGuess,
        this.state.matchCorrectCount,
        this.state.stageCount,
        this.codeJsonCount,
        event.target.dataset.group
      );
      initial.instructions === "You found them all!" ||
      initial.instructions === "You found it!"
        ? this.playCorrect()
        : this.playWrong();
      this.setState(initial);
      setTimeout(() => {
        this.setState(delayed);
      }, timeout);
    }
  };

  handleNbaClick = event => {
    event.preventDefault();
    this.playPick();
    const cardID = `card${event.target.dataset.rank}`;
    this.nbaSelected.push(event.target.alt);
    if (this.nbaSelected.length === 5) {
      this.setState({
        nbaSelected: this.nbaSelected,
        [cardID]: true,
        btnDisabled: false
      });
    } else {
      this.setState({
        nbaSelected: this.nbaSelected,
        [cardID]: true
      });
    }
  };

  handleNbaSubmit = event => {
    event.preventDefault();
    const { initial, delayed, timeout } = nbaSubmit(
      this.nbaSelected,
      this.state.stageCount
    );
    initial.instructions === "You got it!"
      ? this.playCorrect()
      : this.playWrong();
    this.setState(initial);
    this.nbaSelected = [];
    setTimeout(() => {
      this.setState(delayed);
      this.setState({ nbaSelected: this.nbaSelected });
    }, timeout);
  };

  handleNbaClear = event => {
    event.preventDefault();
    this.nbaSelected = [];
    this.setState({
      nbaSelected: this.nbaSelected,
      card0: false,
      card1: false,
      card2: false,
      card3: false,
      card4: false
    });
  };

  handleNumberGuessClick = event => {
    event.preventDefault();
    const userGuess = parseInt(this.state.number);
    const { randomNumber } = this.state;
    const { history, initial, delayed, timeout } = numberGuess(
      userGuess,
      randomNumber,
      this.state.numberHistory.length,
      this.state.stageCount
    );

    // If game is over, won or lost
    if (history === "") {
      this.numberHistory = [];
      initial.numberHistory = this.numberHistory;
      initial.instructions === "You got it!"
        ? this.playCorrect()
        : this.playWrong();
      this.setState(initial);
      setTimeout(() => {
        this.setState(delayed);
      }, timeout);
    } else {
      // If guesses remain
      this.playWrong();
      this.numberHistory.push(history);
      initial.numberHistory = this.numberHistory;
      this.setState(initial);
    }
  };

  handleRockClick = event => {
    event.preventDefault();
    this.playPick();
    const userPick = event.target.dataset.choice;
    this.setState({
      userRock: userPick,
      compRock: "",
      instructions: "Waiting for MPJ..."
    });
    const result = compareRock(
      userPick,
      this.state.userWins,
      this.state.userLosses
    );
    setTimeout(() => {
      if (result.result === "win") {
        this.playCorrect();
      } else if (result.result === "loss") {
        this.playWrong();
      } else {
        this.playPick();
      }

      this.setState(result);
      if (result.userWins === 3) {
        this.setState({
          subInstructions: "You beat MPJ three times!"
        });
        this.playCorrect();
        setTimeout(() => {
          this.setState({ stageCount: this.state.stageCount + 1 });
        }, 3000);
      } else if (result.userLosses === 3) {
        this.setState({
          subInstructions: "MPJ beat you three times! Try again to beat him.",
          userWins: 0,
          userLosses: 0
        });
      } else {
        this.setState({
          subInstructions: "Pick again"
        });
      }
    }, 3000);
  };

  // Code input
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value.toUpperCase()
    });
  };

  handleCodeClick = event => {
    event.preventDefault();
    if (
      `${this.state.letter}${this.state.number}` ===
      codeJson[this.state.codeJsonIndex].code
    ) {
      this.playCorrect();
      this.setState({
        guessReceived: true,
        codeJsonIndex: this.state.codeJsonIndex + 1,
        codeMessage: "You got the code!"
      });
      setTimeout(() => {
        this.setState({
          guessReceived: false,
          stageCount: this.state.stageCount + 1
        });
      }, 3000);
    } else {
      this.playWrong();
      this.setState({
        guessReceived: true,
        codeMessage: "Sorry, that's not right. Try again."
      });
      setTimeout(() => {
        this.setState({
          guessReceived: false
        });
      }, 3000);
    }
  };

  componentDidMount() {
    const shuffled = shuffle(princesses);
    this.setState({
      shuffled,
      randomNumber: Math.floor(Math.random() * 10) + 1
    });
  }

  playCorrect() {
    const audioCorrect = document.getElementsByClassName("audio-correct")[0];
    audioCorrect.play();
  }

  playWrong() {
    const audioWrong = document.getElementsByClassName("audio-wrong")[0];
    audioWrong.play();
  }

  playPick() {
    const audioPick = document.getElementsByClassName("audio-pick")[0];
    console.log(audioPick);
    audioPick.play();
  }

  render() {
    const { stageCount, codeJsonIndex } = this.state;
    const stage = this.stageOrder[stageCount];
    return (
      <div>
        <Container>
          {stage === "MainStart" && (
            <MainStart onClickMain={this.handleMainClick} />
          )}
          {stage === "PlayerStart" && (
            <PlayerStart
              message={codeJson[codeJsonIndex].message}
              player={this.state.player}
              onClick={this.handleMessageClick}
            />
          )}
          {stage === "Trivia" && (
            <Trivia
              guess={this.state.guessReceived}
              json={triviaJson[this.state.triviaJsonIndex]}
              onClickTrivia={this.handleTriviaClick}
              message={this.state.guessResponse}
            />
          )}
          {stage === "Princesses" && (
            <Match
              onClick={this.handlePrincessesClick}
              princesses={this.state.shuffled}
              message={this.state.instructions}
              card0={this.state.card0}
              card1={this.state.card1}
              card2={this.state.card2}
              card3={this.state.card3}
              card4={this.state.card4}
              card5={this.state.card5}
              card6={this.state.card6}
              card7={this.state.card7}
              group0={this.state.group0}
              group1={this.state.group1}
              group2={this.state.group2}
              group3={this.state.group3}
            />
          )}
          {stage === "NBA" && (
            <NBA
              onClick={this.handleNbaClick}
              onClickClear={this.handleNbaClear}
              onClickSubmit={this.handleNbaSubmit}
              disabled={this.state.btnDisabled}
              message={this.state.instructions}
              selected={this.state.nbaSelected}
              card0={this.state.card0}
              card1={this.state.card1}
              card2={this.state.card2}
              card3={this.state.card3}
              card4={this.state.card4}
            />
          )}
          {stage === "NumberGuess" && (
            <NumberGuess
              onClick={this.handleNumberGuessClick}
              onChange={this.handleInputChange}
              message={this.state.instructions}
              guesses={this.state.numberHistory}
            />
          )}
          {stage === "Rock" && (
            <Rock
              onClick={this.handleRockClick}
              message={this.state.instructions}
              subInstructions={this.state.subInstructions}
              wins={this.state.userWins}
              losses={this.state.userLosses}
              user={this.state.userRock}
              mpj={this.state.compRock}
            />
          )}
          {stage === "SecretCode" && (
            <SecretCode
              guess={this.state.guessReceived}
              json={codeJson[this.state.codeJsonIndex]}
              onChange={this.handleInputChange}
              onClickCode={this.handleCodeClick}
              message={this.state.codeMessage}
            />
          )}
          {stage === "Final" && <Final />}
        </Container>
        <div>
          <audio className="audio-correct">
            <source src="./audio/correct_sound.mp3"></source>
          </audio>
          <audio className="audio-wrong">
            <source src="./audio/wrong_sound.mp3"></source>
          </audio>
          <audio className="audio-pick">
            <source src="./audio/pick_sound.wav"></source>
          </audio>
          <audio className="audio-final">
            <source src="../../audio/final_sound.mp3"></source>
          </audio>
        </div>
      </div>
    );
  }
}
export default App;
