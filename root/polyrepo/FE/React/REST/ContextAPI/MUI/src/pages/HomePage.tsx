import React from 'react'

import { useAuth } from '../contexts/AuthContext'

import { Typography } from '@mui/material'
 
export default function HomePage() {

  const {user} = useAuth()


  return (
    <>
    <div>
      <Typography
      variant='h3'>
        Welcome {user?.name}
      </Typography>
    </div>
    </>
  )
}
