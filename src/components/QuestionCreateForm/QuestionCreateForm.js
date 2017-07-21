import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import API_MAP from 'APIMap.js';

import './QuestionCreateForm.scss';

export default class QuestionCreateForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      question: "",
      choices: [""],
    }
  }

  newOption(e) {
    e.preventDefault();

    var choices = Object.assign([], this.state.choices);
    choices.push("");
    this.setState({ choices: choices });
  }

  updateChoice(idx, e, removeMe) {
    var choices = Object.assign([], this.state.choices);
    if (!removeMe) {
      choices[idx] = e.target.value;
    } else {
      choices[idx] = null;
      choices = choices.filter(function(c, idx) {
        return c !== null;
      });
    }
    this.setState({ choices: choices });
  }

  updateQuestion(e) {
    this.setState({
      question: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.serverRequest = axios.post(API_MAP.questions_list, {
      question: this.state.question,
      choices: this.state.choices
    })
      .then(function(result) {
        window.location = "/questions"; // Surely there's a nicer way to do this with the router?
      });
  }

  render() {
    var handleSubmit = this.handleSubmit.bind(this),
        updateQuestion = this.updateQuestion.bind(this),
        updateChoice = this.updateChoice.bind(this),
        newOption = this.newOption.bind(this);

    return (
      <form className="QuestionCreateForm" onSubmit={handleSubmit}>
        <div className="question-title">
          Create a new question
        </div>
        <input type="text" name="question"
          value={this.state.question}
          onChange={updateQuestion} />
        <ul className="question-choices">
          {this.state.choices.map(function(choice, i) {
            return <QuestionCreateFormOption key={i} idx={i} choice={choice}
                     onChange={updateChoice} />;
          })}
          <li>
            <button onClick={newOption}>
              Add another opion
            </button>
          </li>
        </ul>
        <div className="nav-under">
          <Link to="/questions">
            Cancel
          </Link>
          <button type="submit">
           Submit
          </button>
        </div>
      </form>
    );
  }

}

class QuestionCreateFormOption extends Component {

  constructor(props) {
    super(props);
    this.state = {
      choice: props.choice,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      choice: nextProps.choice,
    });
  }

  removeMe(e) {
    e.preventDefault();
    this.props.onChange(this.props.idx, e, true);
  }

  render() {
    return (
      <li>
        <input type="text" 
          value={this.state.choice}
          name="choice[]" 
          onChange={(e) => this.props.onChange(this.props.idx, e)}/>
        <button onClick={this.removeMe.bind(this)}>
          Remove
        </button>
      </li>
    )
  }

}