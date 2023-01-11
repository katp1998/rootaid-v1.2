import {
    useState,
    useEffect
  } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/hooks'  
import { useRouter } from 'next/router'
import { User } from '../types/user.type';

import { register } from '../features/auth/authSlice';

import styles from '../styles/Home.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from '../components/Spinner/Spinner'


const registerPage = () => {

    const router = useRouter()

    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
    const dispatch = useAppDispatch()

    const [fields,setFields] = useState({
      name: '',
      email:'',
      password: ''
    }) 
  
    const [loading,setLoading] = useState<Boolean>(false)
    const [error,setError] = useState<String>('')
  
   
  // Form onchange function 
    
    const onChange =  (event:any) =>{
      setFields({...fields, [event.target.name] : event.target.value});
      setError('')
    }
  
  
    // submit form function
    const handleRegister = async (e :any) => {
      e.preventDefault();
      setError('');
      setLoading(true);
  
      const user : User = {
        name: fields.name as string,
        email: fields.email as string,
        password: fields.password as string
      }

      // validate that all form inputs have been filled
      for (const [key, value] of Object.entries(user)) {
        if(value === '') {
          setError(`Please fill in the \"${key}\" field`)
          setLoading(false)
          return undefined
        }
      }

      try
      {
  
        // set value on redux state
        dispatch(register(user));
            
      } catch (error: any)
      {
        const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong';
        setError(message);
      }
      setLoading(false);
    };
  
  
    useEffect(() => {
      if (isAuthenticated === true) {
        router.push('/')
      }
    
    }, [isAuthenticated]);

  return (
    <>
    <Form className={styles.form} onSubmit={handleRegister}>
    <h2 className={styles.title}>Register</h2>
      <Form.Group className="mb-4" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" name='name' onChange={onChange} value={fields.name} />
      </Form.Group>

      <Form.Group className="mb-4" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={onChange} value={fields.email} />
      </Form.Group>

      <Form.Group className="mb-4" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" name='password' onChange={onChange} value={fields.password}/>
      </Form.Group>

      <Button variant="primary" type="submit" className={styles.btn}>
        Submit
      </Button>

      <Form.Label>{error}</Form.Label>

      {loading ? <Form.Label><Spinner /></Form.Label> : null}      
    </Form>    
    </>
  )
}
export default registerPage