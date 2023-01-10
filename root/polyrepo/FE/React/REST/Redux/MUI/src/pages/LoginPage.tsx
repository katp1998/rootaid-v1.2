import {
    useState,
    useEffect
  } from 'react';
import { useNavigate } from "react-router-dom";
import { User } from '../types/user.type';
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux';
import { login } from '../features/auth/authSlice';
import {
    Box,
    Typography,
    TextField,
    Button
} from '@mui/material/';
  

export default function Login()
{  
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  
  // redux state
  const auth = useSelector((state: any) => state.auth);
  
  const [fields, setFields] = useState<User>({
    email: '',
    password: ''    
  });

  const onChange = (event: any) =>
  {
    setFields({ ...fields, [event.target.name]: event.target.value });
  }

    // Submit form
  const handleLogin = async (e: any) => {
    e.preventDefault();

    const user: User =
    {
      email: fields.email as string,
      password: fields.password as string
    }
    
    dispatch(login(user));

  };
  
  useEffect(() =>
  {
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
            maxWidth={400} 
            alignItems="center"  
            justifyContent={"center"} 
            margin="auto" 
            marginTop={5} 
            padding={'15px 25px 15px 25px '}  
            borderRadius={5} 
            boxShadow={'5px 5px 10px #ccc'}
            sx={{
              ":hover": {
                boxShadow: '10px 10px 20px #ccc'
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
              {auth.errMessage}
            </Typography>
            
          </Box>
        </form>
      </div>
    </>
  )
}

  
   
  