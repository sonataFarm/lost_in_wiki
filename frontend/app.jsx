import React from 'react';
import Page from './components/page';
import { Route, Switch } from 'react-router-dom';
import LinkFlow from './components/link-flow';

const App = props => (
  <Switch>
    <Route exact path='/' component={Page} />
    <Route path='/linkFlow' component={ LinkFlow } />
    <Route path='/:pageID' component={Page} />
  </Switch>
);

export default App;
