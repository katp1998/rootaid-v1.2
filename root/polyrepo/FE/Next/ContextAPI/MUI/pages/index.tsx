import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { useAuth } from '../contexts/AuthContext'
import { Typography } from '@mui/material'

export default function Home() {

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
