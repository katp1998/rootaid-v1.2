import React, { useEffect } from 'react'

import { useAuth } from '../contexts/AuthContext'

import { Typography } from '@mui/material'
 
import getProtectedRoute from '../api/protectedService'


export default function HomePage() {

  const {user,setUserStore,isLoggedIn} = useAuth()



  useEffect(()=>{
    try {
      console.log(isLoggedIn + "home page")    
    } catch (error) {
      
    } 
  },[])

  return (
    <>
    <div>
    {isLoggedIn ? (
      <Typography
      variant='h3'>
        Welcome {user?.name}
      </Typography>
    ):(
    <>
      <Typography
      variant='h3'>
        Welcome to RootAid.
      </Typography>
      <Typography
      variant='h3'>
        Login to continue
      </Typography>
    </>
    )}
    </div>
    </>
  )
}
