/**
 * @Author: GKing
 * @Date: 2022-11-15 18:11:15
 * @LastEditors: GKing
 * @LastEditTime: 2022-11-28 13:32:07
 * @Description: 
 * @TODO: 
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import configureStore from './redux/configureStore';
import reportWebVitals from './reportWebVitals';

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={configureStore()}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
