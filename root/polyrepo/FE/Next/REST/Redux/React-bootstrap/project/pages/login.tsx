import {
    useState,
    useEffect
  } from 'react';
import { useSelector, useDispatch } from 'react-redux'  
import { useRouter } from 'next/router'
import { User } from '../types/user.type';

import authService from '../pages/api/authService'
import { setAuth } from '../store/slices/authSlice';
import { RootState } from '../store/store';

import styles from '../styles/Home.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from '../components/Spinner/Spinner';



const login = () => {

    const router = useRouter()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  
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
        console.log(response);
  
        // set value on zustand state
        const accessToken = response?.data?.accessToken;
        dispatch(setAuth(accessToken));
      }
      catch (error: any)
      {
        const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
        setError(message);
      }
      
      setLoading(false);
    };
    
  
    useEffect(() => {
      if (isAuthenticated) {
        router.push('/')
      }
    }, [isAuthenticated]);

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