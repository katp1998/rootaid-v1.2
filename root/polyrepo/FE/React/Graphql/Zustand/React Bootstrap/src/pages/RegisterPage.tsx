import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import authService from '../api/authService';
import { User } from '../types/user.type';

import { gql, useMutation } from '@apollo/client'

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Home.module.css'

import useStore from '../store/store';

export default function LoginPage() {

  const [fields,setFields] = useState({
    name: '',
    email:'',
    password: ''
  }) 

  const setUserStore = useStore((state:any) => state.setUserStore)
  const setError = useStore((state:any) => state.setError)
  const isError = useStore((state:any) => state.isError)
  const isLoggedIn = useStore((state:any) => state.isLoggedIn)
  const errorMessage = useStore((state:any) => state.errorMessage)
  const reset  = useStore((state:any) => state.reset)


  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
    setError('')
  }

  const navigate = useNavigate();

  useEffect(() =>  {
    if(isError) {
      setError(errorMessage)
    }
    if(isLoggedIn) {
      navigate('/')
      window.location.reload()
    }
    reset()
  },[isLoggedIn])

  const REGISTER_QUERY = gql`
  mutation Register(
      $name: String!,
      $email: String!,
      $password: String!
      ) {
      register(
          name: $name,
          email: $email,
          password: $password
          ){
          token,
          id,
          name
      }
  }` 

const [addUser, { loading}] = useMutation(REGISTER_QUERY, {
  update(proxy, result){
    if(loading){            
    }else{
      console.log(result.data.register.name)
      localStorage.setItem('user',JSON.stringify(result.data.register))
      setUserStore({name:result.data.register.name, email:fields.email})
    }
  },
  onError({graphQLErrors}){
    const message = graphQLErrors.at(0)?.message
    setError(message as string)
    console.log(message)
    console.log(graphQLErrors)
  }
})



  const handleRegister = async (e :any) => {
    e.preventDefault();
    addUser({variables:fields});
    // const user : User = {
    //   email: fields.email as string,
    //   password: fields.password as string
    // } 
    // try {
    //   const response = await authService.register(user)
    //   setUserStore({name:response.name})

    // } catch (error : any) {
    //   const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
    //   setError(message)
    // }
      
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