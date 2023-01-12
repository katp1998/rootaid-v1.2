import {
  useState,
  useEffect
} from 'react'
import { useNavigate } from "react-router-dom";
import { User } from '../types/user.type';
import  useAuth  from '../hooks/useAuth';
import authService from '../api/authService'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Home.module.css';

export default function RegisterPage() {

  const navigate = useNavigate();
  const { auth,setAuth } = useAuth();

  const [fields,setFields] = useState({
    name: '',
    email:'',
    password: ''
  }) 

  const [error, setError] = useState<String>('');

 
// Form onchange function 
  
  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
    setError('')
  }


  // submit form function
  const handleRegister = async (e :any) => {
    e.preventDefault();
    setError('');

    const user: User = {
      name: fields.name as string,
      email: fields.email as string,
      password: fields.password as string
    }

    try
    {
      // get response from register endpoint
      const response = await authService.register(user);
      
      const name = response?.data?.name;
      const accessToken = response?.data?.accessToken;

// set value on context state
      setAuth({ accessToken, isAuthenticated: true });
          
    } catch (error: any)
    {
      const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong';
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
        <Form className={styles.form} onSubmit={handleRegister}>
          <h2 className={styles.title}>Register</h2>
          
          {/* Name */}
          <Form.Group className="mb-4" controlId="username">
            <Form.Label>name</Form.Label>
            <Form.Control required type="text" placeholder="Enter name" name="name" onChange={onChange} value={fields.name} />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-4" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control required type="email" placeholder="Enter email" name="email" onChange={onChange} value={fields.email} />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-4" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" placeholder="Enter password" name="password" onChange={onChange} value={fields.password} />
          </Form.Group>

          <Button  type="submit" className={styles.btn} style={{backgroundColor:'#ff3841',border:" none"}}>
            Submit
          </Button>

          <h6 className={styles.error}>{error}</h6>
          
        </Form>

      </div>
      
    </> 
  )
}
