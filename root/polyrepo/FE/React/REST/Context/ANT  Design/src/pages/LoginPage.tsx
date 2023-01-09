import {
    useState,
    useEffect
  } from 'react';
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
  
  
export default function Login()
{
  const navigate = useNavigate();
  
    // context state
  const { auth, setAuth } = useAuth();
  
  const [fields, setFields] = useState<User>({
    email: '',
    password: ''
  });
  
  const [error, setError] = useState<String>('');
  
  const onChange = (event: any) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
    setError(''); // set error state to empty
  }
  
    // Submit form
  const handleLogin = async (values: any) => {
    setError('');
      
    const user: User = {
      email: values.email as string,
      password: values.password as string
    }

    try {
      // get response from login end point 
      const response = await authService.login(user);
  
      const accessToken = response?.data?.accessToken;
      // set value on context state
      setAuth({ accessToken, isAuthenticated: true });
    }
    catch (error: any) {
      const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong';
      setError(message);
    }
      
  }
    
  useEffect(() => {
  
    if (auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth])
  
  return (
    <>  
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        autoComplete="off"
        className={styles.form}
        layout="vertical"
      >

        <h3 className={styles.title}>Login</h3>

        {/* Email */}
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />         
        </Form.Item>
        
        {/* Submit btn */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
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
  
   
  