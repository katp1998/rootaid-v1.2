import NavBar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './App.css';

function App() {
  return (
    <>
    <NavBar />
<main>
  <Routes>
    <Route path='/' element={<HomePage />}></Route>
    <Route path='/login' element={<LoginPage />}></Route>
    <Route path='/register' element={<RegisterPage />}></Route>
  </Routes> 
</main>
</>
  );
}

export default App;
