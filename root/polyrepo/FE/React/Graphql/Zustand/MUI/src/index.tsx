import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
import App from './App';

import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from './graphql/apolloClient'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
    <Router>
      <App />
    </Router>    
    </ApolloProvider>
  </React.StrictMode>
);


