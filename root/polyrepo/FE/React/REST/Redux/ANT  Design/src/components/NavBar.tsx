import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux';
import { logout } from '../features/auth/authSlice';
import { Menu } from "antd";
import styles from '../styles/Home.module.css';

export default function NavBar()
{
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();

  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  const logOut = () =>
  {
    dispatch(logout());
    navigate('/');
  }

  return (
    <Menu mode="horizontal" className={styles.nav}>

      <Menu.Item className={styles.navOption}>
        <a href="/" >Home</a>
      </Menu.Item>
      
      {isAuthenticated ?
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
