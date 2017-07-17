import React, { Component } from 'react';
import axios from 'axios';

import API_MAP from './APIMap';

export default class QuestionDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: "",
      datetime: "",
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

  render() {
    return (
      <div className="QuestionDetail">
        <div className="question-title">
          {this.state.title}
        </div>
        <time className="question-date" dateTime={this.state.datetime}>
          {this.state.datetime}
        </time>
        <ul className="question-choices">
          {this.state.choices.map(function(choice, i) {
            return <ChoiceInfo key={i} choice={choice} />;
          })}
        </ul>
        <button>
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
      currentVotes: props.choice.votes
    };
  }

  render() {
    return (
      <li className="ChoiceInfo">
        <span className="choice-text">
          {this.state.text}
        </span>
        <span className="choice-votes">
          {this.state.currentVotes}
        </span>
        <span className="choice-percent">
          ??%
        </span>
        <input type="radio" name="choices" value="{this.state.voteUrl}" />
      </li>
    )
  }

}