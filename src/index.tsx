import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
ReactDOM.render(
  <Router history={history}>
   <Provider store={store}>
   <React.StrictMode>
    <App />
  </React.StrictMode>
   </Provider>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
