import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import App from './components/app';
import routes from './components/routes';

render(<Router history={browserHistory} routes={routes} />, document.getElementById('reactApp'));
