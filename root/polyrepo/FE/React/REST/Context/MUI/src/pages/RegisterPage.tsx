import {
    useState,
    useEffect
  } from 'react'
import { useNavigate } from "react-router-dom";
import { User } from '../types/user.type';
import useAuth from '../hooks/useAuth';
import authService from '../api/authService';
import {
    Box,
    Typography,
    TextField,
    Button
} from '@mui/material/';
  
export default function RegisterPage() {
  
    const navigate = useNavigate();
    const { auth,setAuth } = useAuth();
  
    const [fields, setFields] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState<String>('');
  
   
  // Form onchange function 
    
    const onChange = (event: any) => {
        setFields({ ...fields, [event.target.name]: event.target.value });
        setError('');
    }
  
    // submit form function
    const handleRegister = async (e: any) => {
        e.preventDefault();
        setError('');
  
        const user: User = {
            name: fields.name as string,
            email: fields.email as string,
            password: fields.password as string
        }
  
        try
        {
        // get response from register endpoint
            const response = await authService.register(user);
            const accessToken = response?.data?.accessToken;
  
        // set value on context state
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
                <form onSubmit={handleRegister}>
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
                        <Typography fontSize={30} padding={3} textAlign="center">
                            REGISTER
                        </Typography>
            
                        {/* name */}
                        <TextField type='text' name="name" value={fields.name} onChange={onChange} required label="Name" variant="outlined" multiline placeholder='Enter your name' margin='normal' fullWidth color='primary' />
                        {/* email */}
                        <TextField type='email' name="email" value={fields.email} onChange={onChange} required label="Email" variant="outlined" multiline placeholder='Enter email address' margin='normal' fullWidth color='primary' />
                        {/* password */}
                        <TextField type="password" name="password" value={fields.password} onChange={onChange} required label="Password" variant="outlined" multiline placeholder='Enter password' margin="normal" fullWidth color='primary' id="outlined-password-input" />
                            
                        <Button style={{backgroundColor:'#ff3841'} } sx={{ marginTop: 3 }} variant="contained" type="submit"  size="large" fullWidth>Register</Button> 
                            
                        <Typography fontSize={14} fontWeight='bold' color='error' padding={3} textAlign="center">
                            {error}
                        </Typography>
                    </Box>
                </form>
            </div>
        </>
    )
}
  
  