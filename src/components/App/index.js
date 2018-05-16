// @flow
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header';
import LandingPage from '../LandingPage';
import WikiPage from '../WikiPage';
import './index.css';

const App = () => (
  <div className="App">
    <Header />
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/wiki/:urlTitle" component={WikiPage} />
    </Switch>
  </div>
);

export default App;
