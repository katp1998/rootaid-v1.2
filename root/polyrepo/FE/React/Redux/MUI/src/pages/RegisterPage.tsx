import React from 'react'

//IMPORTING MUI LIBS:
import {Box, Typography, TextField, Button} from '@mui/material/';

const RegisterPage = () => {
  return (
    <div>
      <form action="">
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
          <TextField type={'text'} label="Name" variant="outlined" multiline placeholder='Enter name' margin='normal' fullWidth color='error' />
          <TextField type={'email'} label="Email" variant="outlined" multiline placeholder='Enter email address' margin='normal' fullWidth color='error' />
          <TextField type={'password'} label="Password" variant="outlined" multiline placeholder='Enter password' margin="normal" fullWidth color='error' id="outlined-password-input" />
          <Button sx={{marginTop: 3}} variant ="contained" color="error" size="large" fullWidth>Register</Button>  
        </Box>

      </form>
    </div>
  )
}

export default RegisterPage