import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import './App.css';

import API_MAP from './APIMap';

export default class QuestionsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
    }
  }

  componentDidMount() {
    var me = this;
    this.serverRequest = axios.get(API_MAP.questions_list, {
        // In principle, this API supports more than one page, as described in the API docs:
        // 
        //   http://docs.pollsapi.apiary.io/#reference/question/questions-collection/list-all-questions
        //
        // But in practice, there is a) only one page of questions, and b) the
        // API doesn't expose the correct headers via Access-Control-Expose-Headers
        // that we need in order to read the pagination info in the "Link"
        // response header.
        //
        // More info: https://stackoverflow.com/a/37931084/1583183
        params: {
          page: 1
        }
      })
      .then(function(result) {
        me.setState({
          questions: result.data
        });
      });
  }

  render() {
    return (
      <div className="QuestionsList">
        <h1>Questions</h1>
        <div className="QuestionsList-inner">
          {this.state.questions.map(function(question, i) {
            return <QuestionInfo key={i} question={question} />;
          })}
        </div>
      </div>
    );
  }
}


class QuestionInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: props.question.question,
      datetime: props.question.published_at,
      numberChoices: props.question.choices.length,
      // We're currently using the same URL scheme as the API
      url: props.question.url
    };
  }

  formatDate(datestring) {
    var date = moment(datestring),
        now = moment();

    if (now.diff(date, "days") > 1) {

      return date.format("Do MMMM YYYY, h:mm:ss a");

    } else if (now.diff(date, "minutes") > 60) {

      var diffHours = now.diff(date, "hours");
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

    } else if (now.diff(date, "seconds") > 60) {

      var diffMinutes = now.diff(date, "minutes");
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;

    } else {
      return "Just now!";
    }
  }
  
  render() {
    return (
      <div className="QuestionInfo">
        <div className="question-title">
          <Link to={this.state.url}>
            {this.state.title}
          </Link>
        </div>
        <time className="question-date" dateTime={this.state.datetime}>
          {this.formatDate(this.state.datetime)}
        </time>
        <div className="question-info">
          {/* Making the (perhaps bold) assumption that a poll will never
              have more than one choice
          */}
          {this.state.numberChoices} choices
        </div>
      </div>
    )
  }
}