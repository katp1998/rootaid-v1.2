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
import { Button, Form, Input } from 'antd';
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
    const handleLogin = async (values: any) => {
      // e.preventDefault();
      console.log(values);
      setError('');
      setLoading(true);
      
      const user: User = {
        email: fields.email as string,
        password: fields.password as string
      }

      // validate that all form inputs have been filled
      // for (const [key, value] of Object.entries(user)) {
      //   if(value === '') {
      //     setError(`Please fill in the \"${key}\" field`)
      //     setLoading(false)
      //     return undefined
      //   }
      // }      

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
export default login