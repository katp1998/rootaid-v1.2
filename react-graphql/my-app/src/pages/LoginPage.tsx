import React, { useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'





export default function LoginPage() {

    const [values,setValues] = useState({
        name: '',
        email: '',
        password: ''
    })

    

    const LOGIN_QUERY = gql`
    query Login($name: String!, $password: String!) {
        login(name: $name, password: $password) {
            token,
            id
        }
    }
  `
    const [loginUser, { loading, error, data }] = useLazyQuery(LOGIN_QUERY);



  return (
    <div>LoginPage</div>
  )
}
