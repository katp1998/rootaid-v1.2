import { useNavigate } from 'react-router-dom';
import  useAuth  from '../hooks/useAuth';
import authService from '../api/authService';
import { Menu } from "antd";
import styles from '../styles/Home.module.css';

export default function NavBar() {

  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  const logOut = () => {
    authService.logout();
    setAuth({ accessToken: '',  isAuthenticated: false });
    navigate('/');
  }
  
  return (
    <Menu mode="horizontal" className={styles.nav}>

      <Menu.Item className={styles.navOption}>
        <a href="/" >Home</a>
      </Menu.Item>
      
      {auth.isAuthenticated ?
        (
          <Menu.Item className={styles.navOption}>
            <a href="/login" onClick={logOut}  >Logout</a>  
          </Menu.Item>
        
        ) :
        <>
          <Menu.Item className={styles.navOption} >
            <a href="/login"  >Login</a>  
          </Menu.Item>
        
          <Menu.Item  className={styles.navOption}>
            <a href="/register"  >Register</a>  
          </Menu.Item>

        </>
      }
    </Menu>
  )
}

