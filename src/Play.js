import React, { Component } from "react";
import "./Play.css";
import { shuffle } from "./Helpers";

export class Play extends Component {
  static defaultProps = {
    emoji: {
      correct: ["😃", "😄", "😇", "😍", "😊", "🤩", "😎", "🤓"],
      incorrect: ["😢", "😰", "😫", "😓", "🙄", "🤢", "😮", "😮"]
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      curQNum: 1,
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
    this.randomEmoji = this.randomEmoji.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value, didAnswer: false });
  }

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

  async handleNext() {
    console.log("CLICKED EVENT");
    this.setState({ curQNum: this.state.curQNum + 1 });
    if (this.state.curQNum < this.props.totalQ) {
      const ready = this.state.ready;
      const curQNum = this.state.curQNum;
      const newData = ready[curQNum];
      const question = await newData[0];
      const correctAnswer = newData[1];
      const incorrectAnswers = newData[2];
      const allAnswers = [correctAnswer, ...incorrectAnswers];
      const shuffleAnswers = shuffle(allAnswers);
      console.log(shuffleAnswers);
      this.setState({
        curQ: question,
        corA: correctAnswer,
        curA: shuffleAnswers
      });
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

  randomEmoji(arr) {
    const randIndex = Math.floor(Math.random() * arr.length);
    const emoji = arr[randIndex];
    return emoji;
  }

  render() {
    const corEmo = this.randomEmoji(this.props.emoji.correct);
    const incorEmo = this.randomEmoji(this.props.emoji.incorrect);
    const currentQuestion = this.state.curQ;
    const nextButton = (
      <button className="Play-game-btnNext" onClick={this.handleNext}>
        NEXT &#10095;
      </button>
    );

    const correctColor = { color: "#00ed00" };
    return (
      <div className="Play">
        <div className="Play-scoreboard">
          <p>
            Question {this.state.curQNum}/{this.props.totalQ}
          </p>
          <p>Score {this.state.score}</p>
        </div>

        <div className="Play-gameContainer">
          <p className="Play-question">
            <strong>{currentQuestion}</strong>
          </p>
          <div className="Play-game center">
            <div className="Play-game-answers">
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
            <div className="Play-game-button">
              {this.state.didAnswer ? (
                this.state.chosenAnswer === this.state.corA ? (
                  <div className="Play-game-button ">
                    <p className="mb-5 mt-0 reveal-answer correct">
                      <strong style={correctColor}>
                        &#10003; {this.state.chosenAnswer}
                      </strong>{" "}
                      is Correct {corEmo}
                    </p>
                    {nextButton}
                  </div>
                ) : (
                  <div className="Play-game-button ">
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
                  className="Play-game-button Play-game-btnAnswer"
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

export default Play;
