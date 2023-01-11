import {
    useState,
    useEffect
  } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/hooks' 
import { useRouter } from 'next/router'
import { User } from '../types/user.type';

import { login } from '../features/auth/authSlice';

import styles from '../styles/Home.module.css'
import { Button, Form, Input } from 'antd';
import Spinner from '../components/Spinner/Spinner';



const loginForm = () => {

    const router = useRouter()
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
    const dispatch = useAppDispatch()
  
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
    const handleLogin = async (values: any) => {
      console.log(values);
      const {email, password} = values
      setError('');
      setLoading(true);
      
      const user: User = {
        email: email as string,
        password: password as string
      }     

      try
      {
        // set value on redux state
        dispatch(login(user));
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
        <h2 className={styles.title}>Login</h2>
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={handleLogin}     
        autoComplete="off"
        className={styles.form}
        >
        <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
            className={styles.formGroup}
        >
            <Input />
        </Form.Item>

        <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            className={styles.formGroup}
        >
            <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} className={styles.submitBtn}>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </Form.Item>
        <Form.Item>
            {error}
        </Form.Item>
        </Form>
    </>
  )
}
export default loginForm