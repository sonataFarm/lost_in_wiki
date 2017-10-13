import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import {configureStore} from './store/store';
import {fetchPage} from './util/page_api_util';
import {requestPageData} from './actions/page_actions';
import {updateCurrentPage} from './actions/game_actions';

const store = configureStore({});

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
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
window.store = store;
window.fetchPage = fetchPage;
window.requestPageData = requestPageData;
window.updateCurrentPage = updateCurrentPage;
// !!!
