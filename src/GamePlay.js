import React, { Component } from "react";
import axios from "axios";
import "./GamePlay.css";
import fixString from "./Helpers.js";

export class GamePlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      questions: "",
      correctAns: "",
      incorrectAns: ""
    };
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
    // console.log("data api", data);
    console.log("state data", this.state.data);
    let decoded = fixString(this.state.data);
    this.setState(decoded);
  }

  render() {
    let loading = <h1>Loading</h1>;

    let play =
      this.state.questions !== ""
        ? this.state.questions.map(q => <p className="text">{q}</p>)
        : loading;

    return <div>{play}</div>;
  }
}

export default GamePlay;
