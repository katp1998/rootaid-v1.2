import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import authService from '../api/authService';
import { User } from '../types/user.type';

import { gql, useMutation } from '@apollo/client'

import {Box, Typography, TextField, Button} from '@mui/material/';

import useStore from '../store/store';

export default function LoginPage() {

  const [fields,setFields] = useState({
    name: '',
    email:'',
    password: ''
  }) 

  const setUserStore = useStore((state:any) => state.setUserStore)
  const setError = useStore((state:any) => state.setError)
  const isError = useStore((state:any) => state.isError)
  const isLoggedIn = useStore((state:any) => state.isLoggedIn)
  const errorMessage = useStore((state:any) => state.errorMessage)
  const reset  = useStore((state:any) => state.reset)


  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
    setError('')
  }

  const navigate = useNavigate();

  useEffect(() =>  {
    if(isError) {
      setError(errorMessage)
    }
    if(isLoggedIn) {
      navigate('/')
      window.location.reload()
    }
    reset()
  },[isLoggedIn])

  const REGISTER_QUERY = gql`
  mutation Register(
      $name: String!,
      $email: String!,
      $password: String!
      ) {
      register(
          name: $name,
          email: $email,
          password: $password
          ){
          token,
          id,
          name
      }
  }` 

const [addUser, { loading}] = useMutation(REGISTER_QUERY, {
  update(proxy, result){
    if(loading){            
    }else{
      console.log(result.data.register.name)
      localStorage.setItem('user',JSON.stringify(result.data.register))
      setUserStore({name:result.data.register.name, email:fields.email})
    }
  },
  onError({graphQLErrors}){
    const message = graphQLErrors.at(0)?.message
    setError(message as string)
    console.log(message)
    console.log(graphQLErrors)
  }
})



  const handleRegister = async (e :any) => {
    e.preventDefault();
    addUser({variables:fields});
    // const user : User = {
    //   email: fields.email as string,
    //   password: fields.password as string
    // } 
    // try {
    //   const response = await authService.register(user)
    //   setUserStore({name:response.name})

    // } catch (error : any) {
    //   const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
    //   setError(message)
    // }
      
  };


  return (
    <>
    <div>
      <form onSubmit={handleRegister}>
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
          textAlign = "center">REGISTER</Typography>
          <TextField type='text' name="name" value={fields.name}  onChange={onChange} required label="Name" variant="outlined" multiline placeholder='Enter your name' margin='normal' fullWidth color='error' />
          <TextField type='email' name="email" value={fields.email}  onChange={onChange} required label="Email" variant="outlined" multiline placeholder='Enter email address' margin='normal' fullWidth color='error' />
          <TextField type="password" name="password" value={fields.password}  onChange={onChange} required label="Password" variant="outlined" multiline placeholder='Enter password' margin="normal" fullWidth color='error' id="outlined-password-input" />
          <Button sx={{marginTop: 3}} variant ="contained"  type="submit" color="error" size="large" fullWidth>Register</Button>  
          <h1>{errorMessage}</h1>
        </Box>
        </form>
    </div>
    </>
  )
}