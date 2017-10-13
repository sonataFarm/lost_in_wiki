import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LinkFlow from './components/link-flow';
import StarField from './components/star-field';

// !!! testing
import _ from 'lodash';
import hitlerLinks from './util/hitler-links';
// !!! end

const App = props => (
  <Switch>
    <Route exact path='/' render={ () => <StarField links={ _.shuffle(hitlerLinks).slice(0, 50) } /> } />
    <Route path='/linkFlow' component={ LinkFlow } />
  </Switch>
);

export default App;
