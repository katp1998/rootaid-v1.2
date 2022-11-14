import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {UserContextProvider }from './store/UserContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>

    {/* Wrap app component within context provider */}
    <UserContextProvider>
      <App />
    </UserContextProvider>
   
  </React.StrictMode>
);

reportWebVitals();
