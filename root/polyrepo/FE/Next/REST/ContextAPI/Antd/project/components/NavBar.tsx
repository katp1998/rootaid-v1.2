import React, { useState } from 'react';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import  Link from 'next/link';
import { useRouter } from 'next/navigation'

import authService from '../api/authService'

import useAuth from '../hooks/useAuth'; //React Context

const items: MenuProps['items'] = [
  {
    label: 'Home',
    key: 'home'
  },
  {
    label: 'Logout',
    key: 'logout'
  }
]

const items2: MenuProps['items'] = [
    {
    label: 'Login',
    key: 'login'
  },
  {
    label: 'Register',
    key: 'register'
  }
]

export default function NavBar() {

    const router = useRouter()
    const { auth, setAuth } = useAuth()

    const logOut = () => {
      authService.logout()
      setAuth({accessToken:'', isLoggedIn:false})
      router.push('/')
    }

  const [current, setCurrent] = useState('');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  if(current === 'home') {
    router.push('/')
  } else if(current === 'register') {
    router.push('/register')
  } else if(current === 'login') {
    router.push('/login')
  } else {
    logOut()
  }

  return (
    <>
    {auth.isLoggedIn ? (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
  ) : (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items2} />
  )}
  </>
  )
}