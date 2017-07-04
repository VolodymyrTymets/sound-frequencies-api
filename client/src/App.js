import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Routers from './routes';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles/main.css';

const App = ({ store, history }) =>
  <Provider store={store}>
    <Router history={Object.assign(history, store)} >
      <Routers />
    </Router>
  </Provider>;

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default App;


