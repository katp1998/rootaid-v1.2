import  { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useNavigate } from "react-router-dom";
import authService from '../api/authService';
import { User } from "../types/user.type";
import {Box, Typography, TextField, Button} from '@mui/material/';
import { useAuth } from '../contexts/AuthContext';


export default function LoginPage() {

  const [fields,setFields] = useState<User>({
      email: '',
      password: ''
  })

  

  const {setUserStore,setError,reset,isError,errorMessage,isLoggedIn} = useAuth()
  const navigate = useNavigate();

  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
    setError('')
  }

  useEffect(() => {
    if(isError) {
      setError(errorMessage)
      console.log(errorMessage)
    }
    if(isLoggedIn) {
      navigate('/')
      window.location.reload()
    }
    reset()
    console.log("reset run")
  },[isLoggedIn])

  const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
          token,
          id,
          name
      }
  }
`

const { loading, error, data } = useQuery(LOGIN_QUERY, {
  variables: {
    email: fields.email,
    password: fields.password
  }
});


  const handleLogin = (e :any) => {
    e.preventDefault();

    if(data){
      localStorage.setItem('user',JSON.stringify(data))
      setUserStore({name:data.login.name,email:fields.email})
    }


    if(error) {
    setError(error.message)
    console.log(error.message)
    }
    // loginUser({variables:fields});
    // if(!loading){
    //   if(data){
    //     console.log(data.login.name)
    //     localStorage.setItem('user',JSON.stringify(data))
    //     setUserStore({name:data.login.name,email:fields.email})
    //   }
    //   if(error) {
    //     setError(error.message)
    //     console.log(error.message)
    //   }
    // }
  }

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
