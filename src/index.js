import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import '../bootstrap-4.0.0-alpha.6-dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
  	<App />
  </BrowserRouter>,
  document.getElementById('root')
);
