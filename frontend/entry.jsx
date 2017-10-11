import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Root />, root);
});

// !!! testing and debugging
import Page from './util/page';
window.Page = Page;
import wiki from 'wikijs';
window.wiki = wiki;
import APIUtil from './util/api-util';
window.APIUtil = APIUtil;
import urlencode from 'urlencode';
window.urlencode = urlencode;
// !!!
