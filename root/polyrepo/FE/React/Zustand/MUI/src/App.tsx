import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'


//IMPORTING COMPONENTS:
import Header from './components/Header';
import Footer from './components/Footer';

//IMPORTING PAGES:
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
