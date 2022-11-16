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

  const handleLogin = async (e :any) => {
    e.preventDefault();
    try {
      const response  = await authService.login(fields.email,fields.password)
      if(response.data.error){
        setError(response.data.error)
        //console.log(error)
      }else{
        setUser({email:fields.email,name:response.data.name})
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
  )
}
