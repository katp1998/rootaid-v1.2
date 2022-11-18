import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import authService from '../api/authService';

import {Box, Typography, TextField, Button} from '@mui/material/';

import useStore from '../store/store';

export default function LoginPage() {

  const setUser = useStore((state:any) => state.setUser)
  const setLoading = useStore((state:any) => state.setLoading)
  const setError = useStore((state:any) => state.setError)
  const error = useStore((state:any) => state.user.error)
  
  const [fields,setFields] = useState({
    name: '',
    email:'',
    password: ''
  }) 

  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
    setError('')
  }

  const navigate = useNavigate();

  useEffect(() =>  {
    setError('')
    const user = authService.getCurrentUser();

    if (user) {
      navigate("/");
      window.location.reload();
    }

  },[])

  const handleRegister = async (e :any) => {
    e.preventDefault();
    try {
      const response  = await authService.register(fields.name,fields.email,fields.password)
      if(response.data.error){
        setError(response.data.error)
      }else{
        setUser({email:fields.email,name:response.data.name,isLoggedIn:true})
        setError('')
        navigate("/");
        window.location.reload();
      }

    } catch (error) {
        setError('Internal Server Error')
    }
      
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
          <h1>{error}</h1>
        </Box>
        </form>
    </div>
    </>
  )
}