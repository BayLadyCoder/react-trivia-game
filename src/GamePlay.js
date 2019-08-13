import React, { Component } from "react";
import "./GamePlay.css";
import axios from "axios";
import fixString from "./Helpers.js";
import Play from "./Play";

export class GamePlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      ready: false,
      curQuestion: "",
      curAnswers: [],
      correctAnwer: "",
      curQ: 0
    };
    this.handleClicked = this.handleClicked.bind(this);
  }

  async componentDidMount() {
    const totalQ = this.props.totalQ;
    const catId = this.props.catId;
    const base_url = "https://opentdb.com/api.php?";
    const url = base_url + `amount=${totalQ}&category=${catId}&encode=url3986`;
    let res = await axios.get(url);
    // console.log(res.data.results);
    let data = res.data.results;
    this.setState({ data: data });

    let decoded = fixString(this.state.data);
    this.setState({ ready: decoded.ready });

    this.getCurData(this.state.curQ);
  }

  async handleClicked() {
    console.log("CLICKED EVENT");
    await this.setState({ curQ: this.state.curQ + 1 });
    this.getCurData(this.state.curQ);
  }

  getCurData(curQ) {
    console.log(curQ);
    let newData = this.state.ready[curQ];
    console.log("newData", newData);
    let question = newData[0];
    console.log("questions", question);
    let correctAnswer = newData[1];
    let incorrectAnswers = newData[2];
    let allAnswers = [correctAnswer, ...incorrectAnswers];

    this.setState({
      curQuestion: question,
      correctAnswer: correctAnswer,
      curAnswers: allAnswers
    });
  }

  render() {
    console.log("curAnswers", this.state.curAnswers);
    console.log("RENDER GAMEPLAY");
    return (
      <div className="GamePlay">
        {this.state.curAnswers !== [] ? (
          <div>
            <Play curQ={this.state.curQuestion} curA={this.state.curAnswers} />
            <button onClick={this.handleClicked}>NEXT</button>
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    );
  }
}

export default GamePlay;
