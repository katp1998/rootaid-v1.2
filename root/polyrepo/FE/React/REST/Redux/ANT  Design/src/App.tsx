import React from 'react';
import {Routes,Route} from 'react-router-dom'
import './App.css';



import NavBar from './components/NavBar';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './pages/PrivateRoute';

function App() {
  return (
    <>
    <NavBar/>
    <main>
    <Routes>
      <Route path='/' element={<HomePage/>}></Route>
      <Route path='/login' element={<LoginPage/>}></Route>
      <Route path='/register' element={<RegisterPage/>}></Route>
      <Route path='/private' element={<PrivateRoute/>}></Route>
    </Routes> 
    </main>
  </>
  );
}

export default App;
