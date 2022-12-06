import {useEffect,useState} from 'react'
import { Menu } from "antd";
import { Link, useNavigate } from 'react-router-dom'

import authService from '../api/authService'

import useStore from '../store/store';

export default function NavBar() {

  const navigate = useNavigate()
  const user = useStore((state:any) => state.user)
  const isLoggedIn = useStore((state:any) => state.isLoggedIn)
  const setUserStore = useStore((state:any) => state.setUserStore)
  const logout  = useStore((state:any) => state.logout)

  useEffect(() =>  {
    const existingUser = authService.getCurrentUser();

    if (existingUser) {
      setUserStore(existingUser.login.name);
    }
  },[])

  const logOut = () =>{
    authService.logout()
    logout()
    navigate('/')
  }
  return (
    <>
      <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link to={"/"} style={{textDecoration: "none", color:"black", marginRight:"10px"}}>Home</Link>
        </Menu.Item>
        {isLoggedIn ? (
          <Menu.Item key="logout">
          <a href="/login"  onClick={logOut} style={{textDecoration: "none", color:"black", marginRight:"10px"}}>Logout</a>
          </Menu.Item>
        ):(
          <>
            <Menu.Item key="login">
            <Link to={"/login"} style={{textDecoration: "none", color:"black", marginRight:"10px"}}>Login</Link>
            </Menu.Item>
            <Menu.Item key="register">
            <Link to={"/register"} style={{textDecoration: "none", color:"black", marginRight:"10px"}}>Register</Link>
            </Menu.Item>
          </>
        )}

      </Menu>
    </>
)
}