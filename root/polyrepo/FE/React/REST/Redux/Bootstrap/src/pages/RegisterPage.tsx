import {
    useState,
    useEffect
  } from 'react'
import { useNavigate } from "react-router-dom";
import { User } from '../types/user.type';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from '../styles/Home.module.css';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authSlice';

  
export default function RegisterPage()
{  
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();

  // redux state
  const auth = useSelector((state: any) => state.auth);
  
  const [fields, setFields] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState<String>('');
  
  // Form onchange function 
    
  const onChange = (event: any) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
    setError('');
  }
  
    // submit form function
  const handleRegister = async (e: any) =>
  {
    e.preventDefault();
    setError('');
  
    const user: User = {
      name: fields.name as string,
      email: fields.email as string,
      password: fields.password as string
    }

         // validate that all form inputs have been filled
    for (const [key, value] of Object.entries(user))
    {
          if(value === '') {
            setError(`Please fill in the \"${key}\" field`);
            console.log(`Please fill in the \"${key}\" field`);
            return undefined;
          }
    }
    
      dispatch(register(user));
      
  };
  
  useEffect(() =>
  {
    if (auth.isAuthenticated)
    {
      navigate('/');
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
            <Form.Control type="text" placeholder="Enter name" name="name" onChange={onChange} value={fields.name} />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-4" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" onChange={onChange} value={fields.email} />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-4" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" name="password" onChange={onChange} value={fields.password} />
          </Form.Group>

          <Button  type="submit" className={styles.btn} style={{backgroundColor:'#ff3841',border:" none"}}>
            Submit
          </Button>

          <h6 className={styles.error}>{auth.errMessage}</h6>

          <h6 className={styles.error}>{error}</h6>
        </Form>
      </div>    
    </> 
  )}
  