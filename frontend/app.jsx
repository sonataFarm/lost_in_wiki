import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StarfieldContainer from './components/starfield/starfield-container';
import Starfield from './components/starfield/starfield';

// !!! testing
import _ from 'lodash';
import hitlerLinks from './util/hitler-links';
// !!! end

const App = props => (
  <Switch>
    <Route exact path='/dev/starfield' render={ () => <Starfield links={ _.shuffle(hitlerLinks).slice(0, 30) } /> }/>
    <Route exact path='/dev/starfield-container' render={ () => <StarfieldContainer /> } />
    <Route       path='/' render={ () => "Route does not exist - see valid routes in frontend/app.jsx" }/>
  </Switch>
);

export default App;
