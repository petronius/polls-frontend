import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './index.css';
import QuestionsList from './QuestionsList';
import QuestionDetail from './QuestionDetail';
import QuestionCreate from './QuestionCreate';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/questions" />
      <Route path="/questions/new" name="question-new" component={QuestionCreate} />
      <Route path="/questions/:id" name="question-detail" component={QuestionDetail} />
      <Route path="/questions" name="question-list" component={QuestionsList} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
