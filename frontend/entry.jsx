import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import {configureStore} from './store/store';
import {fetchPage} from './util/backend/backend-api-util';
import {Provider} from 'react-redux';
document.addEventListener('DOMContentLoaded', () => {
  let preloadedState = {
    pages: {}
  };

  let store = configureStore(preloadedState);
  window.store = store;
  const root = document.getElementById('root');
  ReactDOM.render(
    <Provider store={store}>
      <Root store={store}/>
    </Provider>,
    root);
});

// !!! testing and debugging
import wiki from 'wikijs';
window.wiki = wiki;

window.fetchPage = fetchPage;

import {
  requestBackendPage,
  requestPageLinks,
  requestPageSummary,
  requestPageRanks,
  getUsableLinks
} from './actions/page-actions';

window.requestBackendPage = requestBackendPage;
window.requestPageLinks = requestPageLinks;
window.requestPageSummary = requestPageSummary;
window.requestPageRanks = requestPageRanks;
window.getUsableLinks = getUsableLinks;

// !!!
