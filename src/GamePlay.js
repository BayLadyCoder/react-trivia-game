import React, { Component } from "react";
import "./css/GamePlay.css";
import { shuffle, randomEmoji } from "./Helpers";

// This Component run the game by displaying each question and its answers
// also showing the chosen Category and current player's Score
export class GamePlay extends Component {
  static defaultProps = {
    emoji: {
      correct: ["😃", "😄", "😇", "😍", "😊", "🤩", "😎", "🤓"],
      incorrect: ["😢", "😰", "😫", "😓", "🙄", "🤢", "😮", "😮"]
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      curQNum: 0,
      curQ: this.props.curQ,
      corA: this.props.corA,
      curA: this.props.curA,
      value: null,
      didAnswer: false,
      chosenAnswer: null,
      totalQ: this.props.totalQ,
      disabled: false,
      ready: this.props.ready,
      score: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.getData = this.getData.bind(this);
  }

  // Handle when user is choosing a choice from RADIO BUTTON
  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  // Handle when user click ANSWER BUTTON
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.value !== null) {
      this.setState({
        didAnswer: true,
        chosenAnswer: this.state.value,
        disabled: true
      });
      if (this.state.value === this.state.corA) {
        this.setState({ score: this.state.score + 1 });
      }

      this.setState({ value: null });
    }
  }

  // Get first question and answers before the component mounts
  componentWillMount() {
    const data = this.state.ready;
    const curQNum = this.state.curQNum;
    this.getData(data, curQNum);
  }

  // Function for getting current question and answers to render
  getData(data, curQNum) {
    this.setState({ curQNum: this.state.curQNum + 1 });
    const newData = data[curQNum];
    const question = newData[0];
    const correctAnswer = newData[1];
    const incorrectAnswers = newData[2];
    const allAnswers = [correctAnswer, ...incorrectAnswers];
    const shuffleAnswers = shuffle(allAnswers);
    this.setState({
      curQ: question,
      corA: correctAnswer,
      curA: shuffleAnswers
    });
  }

  // Get the next question and answers when user click NEXT BUTTON
  // and reset some state
  handleNext() {
    const data = this.state.ready;
    const curQNum = this.state.curQNum;
    if (curQNum < this.props.totalQ) {
      this.getData(data, curQNum);
      this.setState({
        chosenAnswer: false,
        didAnswer: false,
        disabled: false
      });
    } else {
      this.props.gameScore(this.state.score);
      this.props.gameIsDone();
    }
  }

  render() {
    const corEmo = randomEmoji(this.props.emoji.correct); // Random Emoji for Correct Answer
    const incorEmo = randomEmoji(this.props.emoji.incorrect); // Random Emoji for Incorrect Answer
    const currentQuestion = this.state.curQ;
    const nextButton = (
      <button className="GamePlay-game-btnNext" onClick={this.handleNext}>
        NEXT &#10095;
      </button>
    );

    const correctColor = { color: "#00ed00" };
    return (
      <div className="GamePlay">
        <div className="GamePlay-scoreboard">
          <p>
            Question {this.state.curQNum}/{this.props.totalQ}
          </p>
          <p>Score {this.state.score}</p>
        </div>

        <div className="GamePlay-gameContainer">
          <p className="GamePlay-question">
            <strong>{currentQuestion}</strong>
          </p>
          <div className="GamePlay-game center">
            <div className="GamePlay-game-answers">
              {this.state.curA.map(a => (
                <form key={a}>
                  <label
                    key={a}
                    className={this.state.value === a ? "checked" : "unchecked"}
                  >
                    <input
                      type="radio"
                      onChange={this.handleChange}
                      value={a}
                      name={this.state.curQNum}
                      checked={this.state.value === a ? true : false}
                      key={a}
                      id={a}
                      disabled={this.state.disabled}
                      required={true}
                    />
                    {a}
                  </label>
                </form>
              ))}
            </div>
            <div className="GamePlay-game-button">
              {this.state.didAnswer ? (
                this.state.chosenAnswer === this.state.corA ? (
                  <div className="GamePlay-game-button ">
                    <p className="mb-5 mt-0 reveal-answer correct">
                      <strong style={correctColor}>
                        &#10003; {this.state.chosenAnswer}
                      </strong>{" "}
                      is Correct {corEmo}
                    </p>
                    {nextButton}
                  </div>
                ) : (
                  <div className="GamePlay-game-button ">
                    <div className="center">
                      <p className="mb-5 mt-0 reveal-answer incorrect">
                        <strong>&#10008; {this.state.chosenAnswer}</strong> is
                        incorrect. {incorEmo}
                      </p>
                      <p className="mb-5 mt-0 reveal-answer answer">
                        The Answer is <strong>{this.state.corA}</strong>
                      </p>
                    </div>
                    {nextButton}
                  </div>
                )
              ) : (
                <button
                  className="GamePlay-game-button GamePlay-game-btnAnswer"
                  onClick={this.handleSubmit}
                >
                  Answer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GamePlay;
