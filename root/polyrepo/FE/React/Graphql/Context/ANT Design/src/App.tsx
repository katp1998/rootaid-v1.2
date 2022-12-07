import React from 'react';
import { Routes, Route } from 'react-router-dom'

import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from './graphql/apolloClient'




import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import NavBar from './components/NavBar';

function App() {
  return (
      <>
        <NavBar/>
        <main>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/register' element={<RegisterPage/>}></Route>
        </Routes> 
        </main>
      </>
  );
}

export default App;
