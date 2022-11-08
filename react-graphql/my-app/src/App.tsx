import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from './graphql/apolloClient'

import Header from './components/Header';
import Footer from './components/Footer';


import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';


function App() {
  return (
    <>
    <ApolloProvider client={apolloClient}>
    <Router>
      <Header />
      <main>
          <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          </Routes>
      </main>
      <Footer />
    </Router>
    </ApolloProvider>
    </>
  );
}

export default App;
