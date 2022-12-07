import {useEffect,useState} from 'react'
import { Link } from 'react-router-dom'

import authService from '../api/authService'
import { Menu } from "antd";
import useStore from '../store/store';

export default function NavBar() {

  //const [currentUser,setUser] = useState(undefined)
  const user = useStore((state:any) => state.user)
  const setUser = useStore((state:any) => state.setUser)

  useEffect(() =>  {
    const existingUser = authService.getCurrentUser();

    if (existingUser) {
      setUser(existingUser);
    }
  },[])

  const logOut = () =>{
    authService.logout()
  }
  return (
<>
      <Menu mode="horizontal">
      <Menu.Item key="home">
        <Link to={"/"} style={{textDecoration: "none", color:"black", marginRight:"10px"}}>Home</Link>
        </Menu.Item>
        {user.isLoggedIn ? (
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
      //       <Link to={"/"}>Home</Link>
      //     </Typography>
      //     {user.isLoggedIn && (
      //     <Typography>
      //         <Link to={"/private"} >Private</Link>
      //     </Typography>
      //     )}
      //     {user.isLoggedIn ? (
      //       <Typography>
      //         <a href="/login"  onClick={logOut}>Logout</a>
      //       </Typography>
      //     ):(
      //       <Typography>
      //         <Link to={"/login"}>Login</Link>
      //         <Link to={"/register"}>Register</Link>
      //       </Typography>
      //     )}
      //   </Toolbar>
      // </AppBar>
  )
}