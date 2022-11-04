import './App.css';
import userStore from './store/userStore';

function App() {

     // zustand store
     const signinUser = userStore((state: any) => state.signinUser);
     const signOut = userStore((state: any) => state.signOut);
     const user = userStore((state: any) => state.user);
   
     const adduser = () =>
     {
       signinUser(
         {
           name: "User1",
           email: "User1@gmail.com"
         }
       )
     }
     
     const logOut = () =>
     {
       signOut();
   
     }
  
  return (
    <div className="App">
      <div>
     
        <div>
          <p>{user.name}</p>
        </div>
        
        <div>
          <button onClick={() => adduser()}>add user</button>
        </div>
        
        <div>
          <button onClick={() => logOut()}>log out</button>
        </div>

      </div>
      
    </div>
  );
}

export default App;
