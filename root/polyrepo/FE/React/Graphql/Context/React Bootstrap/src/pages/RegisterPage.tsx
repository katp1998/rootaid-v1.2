import  {useState ,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from '@apollo/client'
import { useAuth } from '../contexts/AuthContext';
import authService from '../api/authService';
import { User } from '../types/user.type';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Home.module.css'

export default function RegisterPage() {

  const {errorMessage, isError ,setUserStore,setError, isLoggedIn,reset} = useAuth()
  const navigate = useNavigate();

  const [fields,setFields] = useState<User>({
      name: '',
      email:'',
      password: '' 
    }) 

  const onChange =  (event:any) =>{
      setFields({...fields, [event.target.name] : event.target.value});
      setError('')
    }

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
            localStorage.setItem('user',JSON.stringify(result.data))
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



    const handleRegister = (event :any )=>{
        event.preventDefault(); 
        addUser({variables:fields});
    }


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




