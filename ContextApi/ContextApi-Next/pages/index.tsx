import { useContext } from 'react';
import { UserContext } from '../store/UserContext';
import styles from '../styles/Home.module.css'

export default function Home() {
  const {
    user,
    login } = useContext(UserContext);

  const addUser = () =>
  {
    login({
      name: "User1",
      email: "User1@gmail.com"
    });   
  }
  
  return (
    <>
      
      <div className={styles.container}>
        <h1>{user.name}</h1>

        <div>
          <button onClick={() => addUser()}>add user</button>
        </div>
      
      </div>
      
    </>
    
  )
}
