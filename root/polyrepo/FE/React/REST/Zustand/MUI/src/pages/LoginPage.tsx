import {
    useState,
    useEffect
  } from 'react';
import { useNavigate } from "react-router-dom";
import { User } from '../types/user.type';
import authStore from '../store/authStore';
import {
  Box,
  Typography,
  TextField,
  Button
} from '@mui/material/';
import authService from '../api/authService';
  
  
export default function Login() {
  
  const navigate = useNavigate();
  
  // zustand state
  const { auth, setAuth } = authStore((state: any) => ({
    auth: state.auth, setAuth: state.setAuth
  }));
  
  const [fields, setFields] = useState<User>({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState<String>('');
  
  const onChange = (event: any) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
    setError(''); // set error state to empty
  }
  
  // Submit form
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError('');
      
    const user: User = {
      email: fields.email as string,
      password: fields.password as string
    }
  
    try
    {
        // get response from login end point 
      const response = await authService.login(user);
  
      const accessToken = response?.data?.accessToken;

        // set value on Zustand state
      setAuth({ accessToken, isAuthenticated: true });
    }
    catch (error: any)
    {
      const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong';
      setError(message);
    } 

  };
  
  useEffect(() => {
    if (auth.isAuthenticated)
    {
      navigate('/');
    }
    
  }, [auth]);
  
  return (
    <>
      <div>
        <form onSubmit={handleLogin}>
          <Box 
            display="flex" 
            flexDirection={"column"} 
            maxWidth = {400} 
            alignItems="center" 
            justifyContent={"center"} 
            margin="auto" 
            marginTop={5} 
            padding={'15px 25px 15px 25px '}  
            borderRadius={5} 
            boxShadow={'5px 5px 10px #ccc'}
            sx={{":hover":{
              boxShadow:'10px 10px 20px #ccc'
            }
            }}
          >
            <Typography fontSize={30} padding={3} textAlign="center">LOGIN</Typography>
            {/* Email */}
            <TextField type='email' name="email" value={fields.email} onChange={onChange} required label="Email" variant="outlined" multiline placeholder='Enter email address' margin='normal' fullWidth color='primary' />
            {/* Password */}
            <TextField type="password" name="password" value={fields.password} onChange={onChange} required label="Password" variant="outlined" multiline placeholder='Enter password' margin="normal" fullWidth color='primary' id="outlined-password-input" />
            
            <Button sx={{ marginTop: 3 }} variant="contained" type="submit" style={{ backgroundColor: '#ff3841' }} size="large" fullWidth>Login</Button>  
              
            <Typography fontSize={14} fontWeight='bold' color='error' padding={3} textAlign="center">
              {error}
            </Typography>
              
          </Box>
        </form>
      </div>
    </>
  )
}
  
   
  