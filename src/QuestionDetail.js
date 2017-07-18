import React, { Component } from 'react';
import axios from 'axios';
import classNames from 'classnames';

import API_MAP from './APIMap';

export default class QuestionDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      datetime: null,
      choices: [],
      url: null
    }
  }

  componentDidMount() {
    var me = this,
        // TODO: this is messy, needs cleanup
        questionId = this.props.location.pathname.split("/").slice(-1)[0],
        questionUrl = API_MAP.question_details.replace(":id", questionId);

    this.serverRequest = axios.get(questionUrl)
      .then(function(result) {
        me.setState({
          title: result.data.question,
          datetime: result.data.question.published_at,
          choices: result.data.choices,
          url: result.data.question.url
        });
      });
  }

  selectChoice(choiceIndex, ) {

    var choices = Object.assign([], this.state.choices);

    choices.map(function(choice, i) {
      choice.selected = i == choiceIndex;
    });
    this.setState({ choices: choices });

  }

  vote() {

    var me = this,
        choices = Object.assign([], this.state.choices),
        selectedChoice = choices.filter(function(c) { return c.selected === true })[0];

    axios.get(API_MAP.root + selectedChoice.url)
      .then(function() {
        selectedChoice.votes += 1;
        me.setState({ choices: choices });
      });
  }

  totalVotes() {
    var total = 0;
    this.state.choices.map(function(c) {
      total += c.votes;
    });
    return total;
  }

  render() {
    var listChoices = function(choice, i) {
          return <ChoiceInfo choice={choice} key={i} totalVotes={this.totalVotes()} onClick={(e) => this.selectChoice(i)} />;
        }.bind(this);

    return (
      <div className="QuestionDetail">
        <div className="question-title">
          {this.state.title}
        </div>
        <time className="question-date" dateTime={this.state.datetime}>
          {this.state.datetime}
        </time>
        <ul className="question-choices">
          {this.state.choices.map(listChoices)}
        </ul>
        <button onClick={this.vote.bind(this)}>
          Vote!
        </button>
      </div>
    );
  }

}

class ChoiceInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: props.choice.choice,
      voteUrl: props.choice.url,
      currentVotes: props.choice.votes,
      totalVotes: props.totalVotes,
      selected: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selected: nextProps.choice.selected,
      currentVotes: nextProps.choice.votes,
      totalVotes: nextProps.totalVotes
    });
  }

  render() {
    var choiceClasses = classNames('ChoiceInfo', {
      'selected': this.state.selected,
    });

    return (
      <li className={choiceClasses} onClick={this.props.onClick}>
        <span className="choice-text">
          {this.state.text}
        </span>
        <span className="choice-votes">
          {this.state.currentVotes}
        </span>
        <span className="choice-percent">
          {Math.round(this.state.currentVotes / this.state.totalVotes * 100)}%
        </span>
        <input type="radio" name="choices" value="{this.state.voteUrl}" />
      </li>
    )
  }

}