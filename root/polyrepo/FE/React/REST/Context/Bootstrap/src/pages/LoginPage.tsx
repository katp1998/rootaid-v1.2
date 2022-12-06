import {useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { User } from '../types/user.type';

import { useAuth } from '../contexts/AuthContext';
import authService from '../api/authService'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Home.module.css'




export default function Login() {

  const [fields,setFields] = useState({
    email:'',
    password: ''
  }) 


  const {setUserStore,setError,reset,isError,errorMessage,isLoggedIn} = useAuth()
  const navigate = useNavigate();

    
  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
    setError('') // set error state to empty
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
  },[isLoggedIn])

    const handleLogin = async (e :any) => {
        e.preventDefault();
    
        const user : User = {
          email: fields.email as string,
          password: fields.password as string
        }
        try {
          const response = await authService.login(user)
            setUserStore({name:response.name})
            console.log(isLoggedIn)
  
        } catch (error : any) {
          const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
          setError(message)
        }

      };

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
