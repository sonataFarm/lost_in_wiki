import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LinkFlowContainer from './components/link_flow/link-flow-container';
import StarFieldContainer from './components/star_field/starfield-container';
import Starfield from './components/starfield/starfield';

// !!! testing
import _ from 'lodash';
import hitlerLinks from './util/hitler-links';
// !!! end

const App = props => (
  <Switch>
    <Route exact path='/' render={() => <Starfield links={ _.shuffle(hitlerLinks).slice(0, 30) } />}/>
    <Route path='/linkFlow' component={ LinkFlowContainer } />
  </Switch>
);

export default App;
