import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { BrowserRouter as Router, BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import locationReducer from './Store/Location';
import searchReducer from './Store/Search';
import filterReducer from './Store/Filter';

import './index.css';

const store = configureStore({
  reducer: {
    location: locationReducer,
    search: searchReducer,
    filter: filterReducer
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
