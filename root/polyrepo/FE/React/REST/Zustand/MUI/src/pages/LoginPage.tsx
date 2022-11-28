import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import authService from '../api/authService';
import { User } from "../types/user.type";


import {Box, Typography, TextField, Button} from '@mui/material/';

import useStore from '../store/store';

export default function LoginPage() {

  const [fields,setFields] = useState({
    email:'',
    password: ''
  }) 

  const setUserStore = useStore((state:any) => state.setUserStore)
  const setError = useStore((state:any) => state.setError)
  const isError = useStore((state:any) => state.isError)
  const isLoggedIn = useStore((state:any) => state.isLoggedIn)
  const errorMessage = useStore((state:any) => state.errorMessage)
  const reset  = useStore((state:any) => state.reset)
  
  const navigate = useNavigate();

  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
    setError('')
  }

  useEffect(() =>  {
    if(isError){
      setError(errorMessage)
    }
    if(isLoggedIn){
      navigate('/')
      window.location.reload()
    }  
    reset()
  },[isLoggedIn])

  const handleLogin = async (e :any) => {
    e.preventDefault();

    const user : User = {
      email: fields.email as string,
      password: fields.password as string
    }
    try {
      const response = await authService.login(user)
      setUserStore({name:response.name, email:user.email})
      console.log(response.name)
    } catch (error:any) {
      const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
      setError(message)
    }
  };

  return (
    <>
    <div>
      <form onSubmit={handleLogin}>
        <Box 
        display = "flex" 
        flexDirection={"column"} 
        maxWidth = {400} 
        alignItems="center" 
        justifyContent={"center"} 
        margin="auto" 
        marginTop={5} 
        padding={'50px'} 
        borderRadius={5} 
        boxShadow={'5px 5px 10px #ccc'}
        sx={{":hover":{
          boxShadow:'10px 10px 20px #ccc'
        }}}>
          <Typography 
          variant='h3'
          padding= {3}
          textAlign = "center">LOGIN</Typography>
          <TextField type='email' name="email" value={fields.email}  onChange={onChange} required label="Email" variant="outlined" multiline placeholder='Enter email address' margin='normal' fullWidth color='error' />
          <TextField type="password" name="password" value={fields.password}  onChange={onChange} required label="Password" variant="outlined" multiline placeholder='Enter password' margin="normal" fullWidth color='error' id="outlined-password-input" />
          <Button sx={{marginTop: 3}} variant ="contained"  type="submit" color="error" size="large" fullWidth>Login</Button>  
          <h1>{errorMessage}</h1>
        </Box>

        </form>
    </div>
    </>
  )
}
