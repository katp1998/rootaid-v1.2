import React,
{ useContext } from 'react';
import './App.css';
import  { UserContext } from './store/UserContext';

function App() {
  
  const { user,
    login } = useContext(UserContext);

  const addUser = () =>
  {
    login({
      name: "User1",
      email: "User1@gmail.com"
    });
  }
  
  return (
    <div className="App">
      
      <h1>{user.name}</h1>
 
      <div>
        <button onClick={() => addUser()}>add user</button>
      </div>

    </div>

  );

}

export default App;
