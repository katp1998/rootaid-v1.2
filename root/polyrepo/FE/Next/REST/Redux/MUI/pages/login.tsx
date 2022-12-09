import { User } from '../types/user.type';
import {useState,useEffect} from 'react';
import React from 'react';
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { login , reset } from '../features/authSlice/auth.slice';
import {Box, Typography, TextField, Button} from '@mui/material/';

import styles from '../styles/Home.module.css'

const loginForm: React.FC = () => {

  const [fields,setFields] = useState({
    email:'',
    password: ''
  }) 

  const [error,setError] = useState('')

  const dispatch= useAppDispatch()
  const {user, isLoading , isError, message} = useAppSelector((state) => state.auth)
  const router = useRouter()

  useEffect(() =>  {
    if(isError) {
      setError(message)
    }
 
    if(user) {
      router.push('/')
      window.location.reload();
    }
    dispatch(reset())
  },[user, isError,  message, router, dispatch])


  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
    setError('') // set error state to empty
  }

  const handleLogin = async (e :any) => {
    e.preventDefault();
    
    const user : User = {
      email: fields.email as string,
      password: fields.password as string
    }

    dispatch(login(user))
    
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
          <h1>{error}</h1>
        </Box>

        </form>
    </div>
    </>
  );
};

export default loginForm;