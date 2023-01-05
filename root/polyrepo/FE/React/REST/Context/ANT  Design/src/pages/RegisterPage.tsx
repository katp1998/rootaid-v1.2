import {
    useState,
    useEffect
  } from 'react'
import { useNavigate } from "react-router-dom";
import { User } from '../types/user.type';
import useAuth from '../hooks/useAuth';
import authService from '../api/authService';
import styles from '../styles/Home.module.css';
import {
    Button,
    Form,
    Input
} from 'antd';
  
export default function RegisterPage()
{

  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  
  const [fields, setFields] = useState({
    name: '',
    email: '',
    password: ''
  });
  
  const [error, setError] = useState<String>('');
    
    // submit form function
  const handleRegister = async (values: any) => {
    setError('');
  
    const user: User = {
      name: values.name as string,
      email: values.email as string,
      password: values.password as string
    }
  
    try {
      // get response from register endpoint
      const response = await authService.register(user);
      const accessToken = response?.data?.accessToken;
  
      // set value on context state
      setAuth({ accessToken, isAuthenticated: true });
            
    }
    catch (error: any) {
      const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong';
      setError(message);
    }
  };

  useEffect(() => {

    if (auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth]);
  
  
  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleRegister}
        autoComplete="off"
        className={styles.form}
        layout="vertical"
      >
        <h3 className={styles.title}>Register</h3>
          
        {/* Name */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        {/* Password */}
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} className={styles.submitBtn}>
          <Button className={styles.btn} htmlType="submit">
            Submit
          </Button>
        </Form.Item>
     
        {error &&
          <Form.Item className={styles.error}>
            {error} !
          </Form.Item>}
    
      </Form>
    </> 
  )
}
  
  