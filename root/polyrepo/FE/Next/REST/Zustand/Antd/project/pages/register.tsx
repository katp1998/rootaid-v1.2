import {
    useState,
    useEffect
  } from 'react'
import { useRouter } from 'next/router'
import { User } from '../types/user.type';

import authService from '../pages/api/authService'
import authStore from '../store/authStore';

import styles from '../styles/Home.module.css'
import { Button, Form, Input } from 'antd';
import Spinner from '../components/Spinner/Spinner'


const register = () => {

    const router = useRouter()
    const { auth,setAuth } = authStore((state:any) => ({ auth: state.auth ,setAuth:state.setAuth}));
  
    const [fields,setFields] = useState({
      name: '',
      email:'',
      password: ''
    }) 
  
    const [loading,setLoading] = useState<Boolean>(false)
    const [error,setError] = useState<String>('')
  
   
  // Form onchange function 
    
    const onChange =  (event:any) =>{
      setFields({...fields, [event.target.name] : event.target.value});
      setError('')
    }
  
  
    // submit form function
    const handleRegister = async (values :any) => {
      const {name, email, password} = values
      console.log(values)
      setError('');
      setLoading(true);
  
      const user : User = {
        name: name as string,
        email: email as string,
        password: password as string
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
        // get response from register endpoint
        const response = await authService.register(user);
  
        // set value on zustand state
        const accessToken = response?.data?.accessToken;
        setAuth({accessToken,isAuthenticated:true})
            
      } catch (error: any)
      {
        const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong';
        setError(message);
      }
      setLoading(false);
    };
  
  
    useEffect(() => {
      if (auth.isAuthenticated) {
        router.push('/')
      }
    
    }, [auth]);

  return (
    <>
    <h2 className={styles.title}>Register</h2>
      <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={handleRegister}
      autoComplete="off"
      className={styles.form}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input your name!' }]}
        className={styles.formGroup}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
        className={styles.formGroup}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
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
export default register