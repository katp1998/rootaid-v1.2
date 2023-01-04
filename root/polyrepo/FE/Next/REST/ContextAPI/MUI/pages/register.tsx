import {useState, useEffect} from 'react'
import { User } from '../types/user.type';
import { useRouter } from 'next/router'

import  useAuth  from '../hooks/useAuth';
import authService from '../api/authService'

import styles from '../styles/Home.module.css'
import {Box, Typography, TextField, Button} from '@mui/material/';

const RegisterForm = () => {

    const { auth, setAuth } = useAuth();

    const [fields, setFields] = useState({
        name: "",
        email: "",
        password: "",
    }) 

    // const {username, email, password} = fields

    const [loading,setLoading] = useState<Boolean>(false)
    const [error,setError] = useState<String>('')

    const router = useRouter()

    const onChange =  (event:any) => {
        setFields({...fields, [event.target.name] : event.target.value});
        // setError('')
    }

//     const onChange = (e: any) => {
//     setFields((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

    useEffect(() => {
        // if(isError) {
        //   setError(errorMessage)
        // }
        if(auth.isLoggedIn) {
            router.push('/')
        //window.location.reload()
        }
    
    },[auth])

    const handleRegister = async (e :any) => {
        e.preventDefault();
        setError('')
        setLoading(true)
        const user : User = {
        name: fields.name as string,
        email: fields.email as string,
        password: fields.password as string
        }
        try {
        const response = await authService.register(user)
        
        const name = response?.data?.name
        const accessToken = response?.data?.accessToken

        
        setAuth({accessToken,isLoggedIn:true})
            
        } catch (error : any) {
        const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
        setError(message)
        }
        setLoading(false)
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
        </Box>
        </form>
    </div>
    </>
  );
};

export default RegisterForm;