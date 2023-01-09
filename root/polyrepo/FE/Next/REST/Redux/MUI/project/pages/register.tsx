import {
    useState,
    useEffect
  } from 'react'
import { useSelector, useDispatch } from 'react-redux'  
import { useRouter } from 'next/router'
import { User } from '../types/user.type';

import authService from '../pages/api/authService'
import { setAuth } from '../store/slices/authSlice';
import { RootState } from '../store/store';

import styles from '../styles/Home.module.css'
import {Box, Typography, TextField, Button} from '@mui/material/';
import Spinner from '../components/Spinner/Spinner'


const register = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    const [fields,setFields] = useState({
      name: '',
      email:'',
      password: ''
    }) 
  
    const [loading,setLoading] = useState<Boolean>(false)
    const [error,setError] = useState<String>('')
  
   
  // Form onchange function 
    
    const onChange =  (event:any) =>{
      setFields({...fields, [event.target.name] : event.target.value});
      setError('')
    }
  
  
    // submit form function
    const handleRegister = async (e :any) => {
      e.preventDefault();
      setError('');
      setLoading(true);
  
      const user : User = {
        name: fields.name as string,
        email: fields.email as string,
        password: fields.password as string
      }

      // validate that all form inputs have been filled
      for (const [key, value] of Object.entries(user)) {
        if(value === '') {
          setError(`Please fill in the \"${key}\" field`)
          setLoading(false)
          return undefined
        }
      }

      try
      {
        // get response from register endpoint
        const response = await authService.register(user);
  
        // set value on zustand state
        const accessToken = response?.data?.accessToken;
        dispatch(setAuth(accessToken));
            
      } catch (error: any)
      {
        const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong';
        setError(message);
      }
      setLoading(false);
    };
  
  
    useEffect(() => {
      if (isAuthenticated === true) {
        router.push('/')
      }
    
    }, [isAuthenticated]);

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
        </Box>
        </form>
    </div>    
    </>
  )
}
export default register