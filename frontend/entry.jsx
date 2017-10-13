import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import {configureStore} from './store/store';
import {fetchPage} from './util/page_api_util';
import {requestPageData} from './actions/page_actions';
import {updateCurrentPage} from './actions/game_actions';

document.addEventListener('DOMContentLoaded', () => {
  let preloadedState = {game: {pageHistory: []}};
  let store = configureStore(preloadedState);

  //testing purposes only
  window.store = store;
  window.fetchPage = fetchPage;
  window.requestPageData = requestPageData;
  window.updateCurrentPage = updateCurrentPage;

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
