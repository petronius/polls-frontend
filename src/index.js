import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './index.css';
import QuestionsList from './QuestionsList';
import QuestionDetail from './QuestionDetail';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/questions" />
      <Route exact path="/questions" component={QuestionsList} />
      <Route exact path="/questions/:id" component={QuestionDetail} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
