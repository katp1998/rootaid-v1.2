import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {  useAppSelector } from '../store/hooks';

import { Typography } from '@mui/material'

export default function Home() {

  const {user} = useAppSelector((state) => state.auth)

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
