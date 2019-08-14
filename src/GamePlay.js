import React, { Component } from "react";
import "./GamePlay.css";
import axios from "axios";
import fixString, { shuffle } from "./Helpers.js";
import Play from "./Play";
import GameEnd from "./GameEnd";

export class GamePlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      ready: false,
      curQuestion: "",
      curAnswers: [],
      correctAnswer: "",
      curQ: 0,
      totalQ: this.props.totalQ,
      category: this.props.catName,
      isDone: false,
      disabled: false,
      gameScore: 0
    };
    this.gameIsDone = this.gameIsDone.bind(this);
    this.gameScore = this.gameScore.bind(this);
  }

  async componentDidMount() {
    const totalQ = this.props.totalQ;
    const catId = this.props.catId;
    const base_url = "https://opentdb.com/api.php?";
    const url = base_url + `amount=${totalQ}&category=${catId}&encode=url3986`;
    let res = await axios.get(url);
    // console.log("RESPONSE", res.data.results);
    let data = res.data.results;
    this.setState({ data: data });

    let decoded = fixString(this.state.data);
    this.setState({ ready: decoded.ready });
    this.getCurData(this.state.ready);
  }

  gameIsDone() {
    this.setState({ isDone: true });
  }

  gameScore(score) {
    this.setState({ gameScore: score });
  }

  getCurData(data) {
    console.log("DATA", data);
    let newData = data[0];
    let question = newData[0];
    let correctAnswer = newData[1];
    let incorrectAnswers = newData[2];
    let allAnswers = [correctAnswer, ...incorrectAnswers];
    let shuffleAnswers = shuffle(allAnswers);
    console.log(shuffleAnswers);
    this.setState({
      curQuestion: question,
      correctAnswer: correctAnswer,
      curAnswers: shuffleAnswers
    });
  }

  render() {
    let ready = this.state.ready ? this.state.ready : "not ready";
    let totalQ = this.state.totalQ;
    let category = this.state.category;
    return (
      <div className="GamePlay">
        {!this.state.isDone ? (
          this.state.ready &&
          this.state.curQuestion &&
          this.state.curAnswers ? (
            <div>
              <Play
                curQ={this.state.curQuestion}
                curA={this.state.curAnswers}
                corA={this.state.correctAnswer}
                totalQ={totalQ}
                ready={ready}
                gameIsDone={this.gameIsDone}
                gameScore={this.gameScore}
              />
            </div>
          ) : (
            <div>Loading</div>
          )
        ) : (
          <GameEnd
            totalQ={totalQ}
            category={category}
            score={this.state.gameScore}
            newGame={this.props.newGameBtn}
          />
        )}
      </div>
    );
  }
}

export default GamePlay;
