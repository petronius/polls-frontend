import React, { Component } from 'react';
import axios from 'axios';
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
        // In principle, this API supports more than one page, as described in the API:
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
      questionDetails: props.question
    };
  }
  
  render() {
    return (
      <div className="QuestionInfo">
        {this.state.questionDetails.question}
      </div>
    )
  }
}