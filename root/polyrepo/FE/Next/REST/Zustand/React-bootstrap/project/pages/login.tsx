import {
    useState,
    useEffect
  } from 'react';
import { useRouter } from 'next/router'
import { User } from '../types/user.type';
import Spinner from '../components/Spinner/Spinner';
import authService from '../pages/api/authService'
import authStore from '../store/authStore';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Home.module.css'


const login = () => {

    const router = useRouter()

    // context state
    const { auth, setAuth } = authStore((state:any) => ({ auth: state.auth ,setAuth:state.setAuth}));
  
    const [fields, setFields] = useState<User>({
      email: '',
      password: ''
    });
  
    const [loading, setLoading] = useState<Boolean>(false);
    const [error, setError] = useState<String>('');
  
    
    const onChange =  (event:any) =>{
      setFields({...fields, [event.target.name] : event.target.value});
      setError(''); // set error state to empty
    }
  
    // Submit form
    const handleLogin = async (e: any) => {
      e.preventDefault();
      setError('');
      setLoading(true);
      
      const user: User = {
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
        // get response from login end point 
        const response = await authService.login(user);
  
        // set value on zustand state
        const accessToken = response?.data?.accessToken;        
        setAuth({ accessToken, isLoggedIn: true });
      }
      catch (error: any)
      {
        const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
        setError(message);
      }
      
      setLoading(false);
    };
    
  
    useEffect(() => {
      if (auth.isLoggedIn) {
        router.push('/')
      }
    }, [auth]);

  return (
    <>
        <Form className={styles.form} onSubmit={handleLogin}>
        <h2 className={styles.title}>Login</h2>
        <Form.Group className="mb-4" controlId="username">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Enter email" name='email' onChange={onChange} value={fields.email} />
        </Form.Group>

        <Form.Group className="mb-4" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" onChange={onChange} name='password' value={fields.password} />
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
export default login