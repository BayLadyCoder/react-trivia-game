import React, { Component } from "react";
import "./css/GameStart.css";
import axios from "axios";
import fixString from "./Helpers.js";
import GamePlay from "./GamePlay";
import GameEnd from "./GameEnd";

// Once we get the user input from NewGameForm Component this Component will be rendered
// This class is the class that fetch data from API and pass data to GamePlay
// It also decides if it's going to render GamePlay (display questions) or GameEnd (display summary) components
export class GameStart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      ready: false,
      totalQ: this.props.totalQ,
      category: this.props.catName,
      isDone: false,
      gameScore: 0
    };
    this.gameIsDone = this.gameIsDone.bind(this);
    this.gameScore = this.gameScore.bind(this);
  }

  // Fetching data from API, then decode the String URLs
  async componentDidMount() {
    const totalQ = this.props.totalQ;
    const catId = this.props.catId;
    const base_url = "https://opentdb.com/api.php?";
    const url = base_url + `amount=${totalQ}&category=${catId}&encode=url3986`;
    const res = await axios.get(url);

    const data = res.data.results;
    this.setState({ data: data });

    const decoded = fixString(this.state.data);
    this.setState({ ready: decoded.ready });
  }

  // GamePlay will invoke this function once it runs all the questions
  // When game is done is True, it will render GameEnd Component
  gameIsDone() {
    this.setState({ isDone: true });
  }

  // GamePlay will invoke this function and pass the final score through this function when game is done,
  // then this Component will pass the last score to GameEnd Component to render
  gameScore(score) {
    this.setState({ gameScore: score });
  }

  render() {
    const ready = this.state.ready ? this.state.ready : "not ready";
    const totalQ = this.state.totalQ;
    const category = this.state.category;
    return (
      <div className="GameStart">
        {!this.state.isDone ? (
          this.state.ready ? (
            <div>
              <GamePlay
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
            <div className="GameStart-loading">Loading...</div>
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

export default GameStart;
