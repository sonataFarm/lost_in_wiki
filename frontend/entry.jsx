import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import {configureStore} from './store/store';
import {fetchPage} from './util/backend/backend-api-util';
import {requestPageData} from './actions/page_actions';
import {updateCurrentPage} from './actions/game_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store = configureStore({});
  window.store = store;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});

// !!! testing and debugging
import wiki from 'wikijs';
window.wiki = wiki;

window.fetchPage = fetchPage;
window.requestPageData = requestPageData;
window.updateCurrentPage = updateCurrentPage;
// !!!
