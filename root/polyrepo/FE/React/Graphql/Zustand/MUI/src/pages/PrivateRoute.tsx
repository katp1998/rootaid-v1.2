import {useEffect, useState} from 'react'

import getPrivateRoute from '../api/protectedService'

export default function PrivateRoute() {

  const [error,setError] = useState('')
  const [message,setMessage] = useState('')

  const protectedReq = async () => {
    try {
      const response = await getPrivateRoute()
      console.log(response)
      if(response.data.error){
        setError(response.data.error)
      }else{
        setMessage(response.data.message)
      }
    } catch (error) {
      setError("Internal Server Error")
    }
  }

  useEffect( () => {
    protectedReq()
  },[])

  return (
    <>
    <h3>PrivateRoute</h3>
    <h3>{message}</h3>
    <h3>{error}</h3>
    </>
    
    
  )
}
