import {
  useState,
  useEffect
} from 'react';
import { useNavigate } from "react-router-dom";
import { User } from '../types/user.type';
import  useAuth  from '../hooks/useAuth';
import authService from '../api/authService'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Home.module.css'


export default function Login() {

  const navigate = useNavigate();

  // context state
  const { auth, setAuth } = useAuth();

  const [fields, setFields] = useState<User>({
    email: '',
    password: ''
  });

  const [error, setError] = useState<String>('');
  
  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
    setError(''); // set error state to empty
  }

  // Submit form
  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError('');

    const user: User = {
      email: fields.email as string,
      password: fields.password as string
    }

    try
    {
      // get response from login end point 
      const response = await authService.login(user);

      const accessToken = response?.data?.accessToken;
      // set value on context state
      setAuth({ accessToken, isAuthenticated: true });
    }
    catch (error: any)
    {
      const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
      setError(message);
    }
    
  };
  

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/')
    }
  }, [auth]);

  return (
    <>
      <div>

        <Form className={styles.form} onSubmit={handleLogin} >
          <h4 className={styles.title}>Login</h4>

          {/* email */}
          <Form.Group className="mb-4" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Enter email" name='email' onChange={onChange} value={fields.email} />
          </Form.Group>

          {/* password */}
          <Form.Group className="mb-4" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" onChange={onChange} name='password' value={fields.password} />
          </Form.Group>
          
          {/* submit btn */}
          <Button  type="submit" className={styles.btn}  style={{backgroundColor:'#ff3841',border:" none"}}>
            Submit
          </Button>

          <h6 className={styles.error}>{error}</h6>

        </Form> 
      </div>
    </>
  )
}

 
