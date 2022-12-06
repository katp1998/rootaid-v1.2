import React from 'react'

import { useAuth } from '../contexts/AuthContext'


 
export default function HomePage() {

  const {user} = useAuth()


  return (
    <>
    <div>
      <h3>
      Welcome {user?.name}
      </h3>
    </div>
    </>
  )
}
