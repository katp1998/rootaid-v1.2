import { useAppSelector, useAppDispatch } from '../hooks/hooks' 

import { logout } from '../features/auth/authSlice';
import { Menu } from "antd";
import authService from '../pages/api/authService'

export default function Navbar() {

  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const dispatch = useAppDispatch()

  const logOut = () =>{
    authService.logout()
    dispatch(logout())
  }

  return (
      <Menu mode="horizontal" style={{marginBottom:'25px'}}>
      <Menu.Item key="home">
        <a href='/' style={{textDecoration: "none", color:"black", marginRight:"10px"}}>Home</a>
        </Menu.Item>
        {isAuthenticated ? (
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