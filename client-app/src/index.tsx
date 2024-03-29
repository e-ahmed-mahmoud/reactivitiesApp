import React from 'react';
import ReactDOM from 'react-dom';
import './components/app/styles.css';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './components/app/statemanagement/store';

ReactDOM.render(
    <StoreContext.Provider value={store}>
      <App />
    </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
