import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { ThemeProvider, createTheme } from '@mui/material';
// import 'path-browserify'
// import 'dotenv'
// const fs = require('fs-extra');
// require('dotenv').config();
// dotenv.config();
const theme = createTheme();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter >
);


reportWebVitals();
