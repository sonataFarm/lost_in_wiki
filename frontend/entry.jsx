import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';

// testing and debugging
import wiki from 'wikijs';
import APIUtil from './util/api-util';
//end

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Root />, root);

  // testing and debugging
  window.wiki = wiki;
  window.APIUtil = APIUtil;
  // end

});
