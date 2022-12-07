import  { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useNavigate } from "react-router-dom";
import authService from '../api/authService';
import { User } from "../types/user.type";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Home.module.css'
import { useAuth } from '../contexts/AuthContext';


export default function LoginPage() {

  const [fields,setFields] = useState<User>({
      email: '',
      password: ''
  })

  

  const {setUserStore,setError,reset,isError,errorMessage,isLoggedIn} = useAuth()
  const navigate = useNavigate();

  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
    setError('')
  }

  useEffect(() => {
    if(isError) {
      setError(errorMessage)
      console.log(errorMessage)
    }
    if(isLoggedIn) {
      navigate('/')
      window.location.reload()
    }
    reset()
    console.log("reset run")
  },[isLoggedIn])

  const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
          token,
          id,
          name
      }
  }
`

const { loading, error, data } = useQuery(LOGIN_QUERY, {
  variables: {
    email: fields.email,
    password: fields.password
  }
});


  const handleLogin = (e :any) => {
    e.preventDefault();

    if(data){
      localStorage.setItem('user',JSON.stringify(data))
      setUserStore({name:data.login.name,email:fields.email})
    }


    if(error) {
    setError(error.message)
    console.log(error.message)
    }
    // loginUser({variables:fields});
    // if(!loading){
    //   if(data){
    //     console.log(data.login.name)
    //     localStorage.setItem('user',JSON.stringify(data))
    //     setUserStore({name:data.login.name,email:fields.email})
    //   }
    //   if(error) {
    //     setError(error.message)
    //     console.log(error.message)
    //   }
    // }
  }

  return (
    <>
    <div>
    <h2 className={styles.title}>Login</h2>
    <Form className={styles.form} onSubmit={handleLogin} >
      <Form.Group className="mb-4" controlId="username">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name='email' onChange={onChange} value={fields.email} />
      </Form.Group>

      <Form.Group className="mb-4" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" onChange={onChange} name='password' value={fields.password} />
      </Form.Group>

      <Button variant="primary" type="submit" className={styles.btn}>
        Submit
      </Button>
      <Form.Label>{errorMessage}</Form.Label>
    </Form>
    </div>
    </>
  )
}
