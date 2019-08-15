import React, { Component } from "react";
import Categories from "./Categories";
import "./css/NewGameForm.css";

// This class is a form to get user input (total questions and category) to start the game
export class NewGameForm extends Component {
  static defaultProps = Categories;
  constructor(props) {
    super(props);
    this.state = {
      totalQuestions: "5",
      category: "",
      id: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handle user inputs (total questions and a category) SELECT OPTIONS and RADIO BUTTONS
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    e.target.name === "category"
      ? this.setState({ id: e.target.id })
      : console.log(e.target.value);
  }

  // Send user input data to TriviaGame Component (parent)
  // to create a new game through CREATE FUNCTION
  // and also reset some state
  handleSubmit(e) {
    e.preventDefault();
    const newGame = this.state;
    this.props.create(newGame);
    this.setState({ totalQuestions: "5", category: "", id: "" });
  }

  render() {
    const totalQuestionSet = [5, 10, 15, 20, 25, 30];

    return (
      <div className="NewGameForm">
        <form onSubmit={this.handleSubmit} className="NewGameForm-form">
          <div className="NewGameForm-totalQuestions">
            <label
              htmlFor="totalQuestions"
              id="totalQuestionsLabel"
              className="ask"
            >
              How many questions do you want to play?
            </label>
            <select
              onChange={this.handleChange}
              name="totalQuestions"
              id="totalQuestions"
              value={this.state.totalQuestions}
            >
              {totalQuestionSet.map(set => (
                <option value={set} key={set}>
                  {set}
                </option>
              ))}
            </select>
          </div>
          <p className="ask">Choose a category</p>
          <div className="NewGameForm-categories">
            {this.props.trivia_categories.map(cat => (
              <label key={cat.name} className="NewGameForm-category">
                <input
                  type="radio"
                  onChange={this.handleChange}
                  value={cat.name}
                  name="category"
                  checked={this.state.category === cat.name ? true : false}
                  key={cat.name}
                  id={cat.id}
                  required={true}
                />
                {cat.name}
              </label>
            ))}
          </div>
          <button className="btn-startgame">Start Game &#10154;</button>
        </form>
      </div>
    );
  }
}

export default NewGameForm;
