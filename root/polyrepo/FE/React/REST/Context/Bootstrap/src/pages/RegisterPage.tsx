import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { User } from '../types/user.type';
import { useAuth } from '../contexts/AuthContext';
import authService from '../api/authService'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Home.module.css'

export default function RegisterPage() {
  const [fields,setFields] = useState({
    name: '',
    email:'',
    password: ''
  }) 

  

  const {  errorMessage, isError ,setUserStore,setError, isLoggedIn,reset} = useAuth()
  const navigate = useNavigate()

  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
  }

  useEffect(() => {
    if(isError) {
      setError(errorMessage)
    }
    if(isLoggedIn) {
      navigate('/')
      window.location.reload()
    }
    reset();
  },[isLoggedIn])

  const handleRegister = async (e :any) => {
    e.preventDefault();

    const user : User = {
      name: fields.name as string,
      email: fields.email as string,
      password: fields.password as string
    }
    try {
      const response = await authService.register(user)
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
    <h2 className={styles.title}>Register</h2>
    <Form className={styles.form} onSubmit={handleRegister}>
      <Form.Group className="mb-4" controlId="username">
        <Form.Label>name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name="name" onChange={onChange} value={fields.name} />
      </Form.Group>

      <Form.Group className="mb-4" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" onChange={onChange} value={fields.email} />
      </Form.Group>

      <Form.Group className="mb-4" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password"  name="password" onChange={onChange} value={fields.password}/>
      </Form.Group>

      <Button variant="primary" type="submit"  className={styles.btn}>
        Submit
      </Button>
      <Form.Label>{errorMessage}</Form.Label>
    </Form>
    </div>
    </>
  )
}
