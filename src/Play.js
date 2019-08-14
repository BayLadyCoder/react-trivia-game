import React, { Component } from "react";
import "./Play.css";

export class Play extends Component {
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
      curReady: "",
      score: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNext = this.handleNext.bind(this);

    console.log(
      "CONSTRUCT PLAY",
      this.state.curQ,
      this.state.corA,
      this.state.curA
    );
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
      let ready = this.state.ready;
      let curQNum = this.state.curQNum;
      let newData = ready[curQNum];
      let question = await newData[0];
      let correctAnswer = newData[1];
      let incorrectAnswers = newData[2];
      let allAnswers = [correctAnswer, ...incorrectAnswers];

      this.setState({ curQ: question, corA: correctAnswer, curA: allAnswers });
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
    let curQNum = this.state.curQNum;
    return (
      <div className="Play">
        <p>
          Question {curQNum}/{this.props.totalQ}
        </p>
        <p>Score: {this.state.score}</p>
        <p>{this.state.curQ}</p>
        {this.state.curA.map(a => (
          <form>
            <label key={curQNum}>
              <input
                type="radio"
                onChange={this.handleChange}
                value={a}
                name={this.props.curQNum}
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
        {this.state.didAnswer ? (
          this.state.chosenAnswer === this.state.corA ? (
            <div className="correct">
              {this.state.chosenAnswer} is Correct
              <br />
              <button onClick={this.handleNext}>NEXT</button>
            </div>
          ) : (
            <div className="incorrect">
              {this.state.chosenAnswer} is Incorrect. The Answer is{" "}
              {this.state.corA}
              <br />
              <button onClick={this.handleNext}>NEXT</button>
            </div>
          )
        ) : (
          <button onClick={this.handleSubmit}>Answer</button>
        )}
      </div>
    );
  }
}

export default Play;

//   <div className="NewGameForm-categories">
//     {this.props.trivia_categories.map(cat => (
//       <label key={cat.name} className="NewGameForm-category">
//         <input
//           type="radio"
//           onChange={this.handleChange}
//           value={cat.name}
//           name="category"
//           checked={this.state.category === cat.name ? true : false}
//           key={cat.name}
//           id={cat.id}
//         />
//         {cat.name}
//       </label>
//     ))}
//   </div>
