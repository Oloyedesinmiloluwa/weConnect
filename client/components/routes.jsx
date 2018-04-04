import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import Navigation from './navigation';
import signup from './signUp';

export default (
  <Route path="/" component={Navigation} >
    <IndexRoute component={App} />
    <Route path="signup" component={signup} />
  </Route>
);
