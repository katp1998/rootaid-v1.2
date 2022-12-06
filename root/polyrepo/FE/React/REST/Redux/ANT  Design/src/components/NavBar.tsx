import {useEffect,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {logout , reset} from '../features/authSlice/auth.slice'

import { Menu } from "antd";


export default function NavBar() {

  const navigate = useNavigate()
  const dispatch= useAppDispatch()
  const {user} = useAppSelector((state) => state.auth)


  const logOut = () =>{
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }
  return (
    <>
      <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link to={"/"} style={{textDecoration: "none", color:"black", marginRight:"10px"}}>Home</Link>
        </Menu.Item>
        {user ? (
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
      // <AppBar  position='static'>
      //   <Toolbar>
      //     <Typography>
      //       <Link to={"/"} style={{textDecoration: "none", color:"white", marginRight:"10px"}}>Home</Link>
      //     </Typography>
      //     <Box alignItems="right" sx={{flexGrow:1, textAlign:"right"}}>
      //     {user ? (
      //       <Typography>
      //         <a href="/login"  onClick={logOut} style={{textDecoration: "none", color:"white", marginRight:"10px"}}>Logout</a>
      //       </Typography>
      //     ):(
      //       <Typography>
      //         <Link to={"/login"} style={{textDecoration: "none", color:"white", marginRight:"10px"}}>Login</Link>
      //         <Link to={"/register"} style={{textDecoration: "none", color:"white", marginRight:"10px"}}>Register</Link>
      //       </Typography>
      //     )}
      //     </Box>
      //   </Toolbar>
      // </AppBar>
  )
}