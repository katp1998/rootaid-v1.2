import React from 'react'

//IMPORTING MUI LIBS:
import { AppBar, Toolbar, Typography, IconButton, Box, Button} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  return (
    <div>
      <Box display= "flex" style={{marginBottom:"100px"}}>
      <AppBar position="absolute" color='default'>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            REACT-MUI APP
          </Typography>
          <Button href='/login' color="inherit">Login</Button>
          <Button href='/register' color="inherit">Register</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  )
}

export default Header