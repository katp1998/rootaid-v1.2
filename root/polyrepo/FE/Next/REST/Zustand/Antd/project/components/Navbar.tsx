import { Menu } from "antd";
import authService from '../pages/api/authService'
import authStore from '../store/authStore';

export default function NavBar() {

  const { auth, setAuth } = authStore((state: any) => ({
    auth: state.auth, setAuth: state.setAuth
  }))
  
  const logOut = () => {
    authService.logout();
    setAuth({ accessToken: '', isAuthenticated: false });
  }

  return (
      <Menu mode="horizontal" style={{marginBottom:'25px'}}>
      <Menu.Item key="home">
        <a href='/' style={{textDecoration: "none", color:"black", marginRight:"10px"}}>Home</a>
        </Menu.Item>
        {auth.isAuthenticated ? (
          <Menu.Item key="logout">
          <a href="/"  onClick={logOut} style={{textDecoration: "none", color:"black", marginRight:"10px"}}>Logout</a>
          </Menu.Item>
        ):(
          <>
            <Menu.Item key="login">
            <a href='/login' style={{textDecoration: "none", color:"black", marginRight:"10px"}}>Login</a>
            </Menu.Item>
            <Menu.Item key="register">
            <a href='/register' style={{textDecoration: "none", color:"black", marginRight:"10px"}}>Register</a>
            </Menu.Item>
          </>
        )}

      </Menu>
  )
}