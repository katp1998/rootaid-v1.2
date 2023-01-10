import {
    useState,
    useEffect
  } from 'react'
import { useNavigate } from "react-router-dom";
import { User } from '../types/user.type';
import styles from '../styles/Home.module.css';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../features/auth/authSlice';
import {
    Button,
    Form,
    Input
} from 'antd';

  
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
  
    // submit form function
  const handleRegister = async (values: any) =>
  {
  
    const user: User = {
      name: values.name as string,
      email: values.email as string,
      password: values.password as string
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
    
        {auth.errMessage &&
          <Form.Item className={styles.error}>
          {auth.errMessage}!
          </Form.Item>}
    
      </Form>
  </> 
  )}
  