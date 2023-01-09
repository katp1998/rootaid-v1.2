import {
    useState,
    useEffect
  } from 'react'
  import { useRouter } from 'next/router'
  import { User } from '../types/user.type';
  import authService from '../pages/api/authService'
  import {Box, Typography, TextField, Button} from '@mui/material/';
import authStore from '../store/authStore';

const register = () => {

    const router = useRouter()
    const { auth,setAuth } = authStore((state:any) => ({ auth: state.auth ,setAuth:state.setAuth}));
  
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
        setAuth({accessToken,isAuthenticated:true})
            
      } catch (error: any)
      {
        const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong';
        setError(message);
      }
      setLoading(false);
    };
  
  
    useEffect(() => {
      if (auth.isAuthenticated) {
        router.push('/')
      }
    
    }, [auth]);

  return (
    <>
<div>
        <form onSubmit={handleRegister}>
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
              boxShadow: '10px 10px 20px #ccc'
            }
            }}
          >
            <Typography fontSize={30}  padding={3} textAlign="center">
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
export default register