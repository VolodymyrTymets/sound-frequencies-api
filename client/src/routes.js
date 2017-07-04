import React from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export default () => (
  <Switch>
     <Route exact path="/" component={Home}/>
     <Route component={NotFound}/>
  </Switch>
);
