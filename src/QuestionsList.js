import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import API_MAP from './APIMap';

export default class QuestionsList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  componentDidMount() {
    var me = this;
    this.serverRequest = axios.get(API_MAP.questions_list)
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