import React from 'react';
import Page from './components/page';
import { Route, Switch } from 'react-router-dom';

const App = () => (
  <Switch>
    <Route path='/' component={Page} />
    <Route path='/:pageID' component={Page} />
  </Switch>
);

export default App;
