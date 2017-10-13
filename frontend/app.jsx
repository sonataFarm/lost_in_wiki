import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LinkFlowContainer from './components/link_flow/link-flow-container';
import StarField from './components/star-field';

// !!! testing
import _ from 'lodash';
import hitlerLinks from './util/hitler-links';
// !!! end

const App = props => (
  <Switch>
    <Route exact path='/' render={() => <StarField links={ links } />}/>
    <Route path='/linkFlow' component={ LinkFlowContainer } />
  </Switch>
);

export default App;
