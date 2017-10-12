import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import {configureStore} from './store/store';
const fs = require('fs');

document.addEventListener('DOMContentLoaded', () => {
  let store = configureStore({});
  window.store = store;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
