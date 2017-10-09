import React from 'react';
import App from './app';
import { BrowserRouter } from 'react-router-dom';

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default Root;
