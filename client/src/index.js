import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import configureStore from './store/configureStore';
import App from './App';

const store = configureStore();


ReactDOM.render(
  <App store={store} history={createHistory()}/>,
  document.getElementById('root')
);