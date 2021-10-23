import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom"
import {store} from "./Redux/Store"
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "jquery/dist/jquery.min.js"
import "popper.js/dist/umd/popper.min.js"
import "bootstrap/dist/js/bootstrap.min.js"
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
  
  <BrowserRouter>

      <Provider store={store}>
      <App />
      </Provider>
        
  </BrowserRouter>

  </React.StrictMode>,
  document.getElementById('root')
);

