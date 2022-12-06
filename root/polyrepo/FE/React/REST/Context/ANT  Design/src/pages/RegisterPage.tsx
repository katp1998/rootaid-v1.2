import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { User } from '../types/user.type';
import { useAuth } from '../contexts/AuthContext';
import authService from '../api/authService'

import { Button, Checkbox, Form, Input } from 'antd';
import styles from '../styles/Home.module.css'

export default function RegisterPage() {
  const [fields,setFields] = useState({
    name: '',
    email:'',
    password: ''
  }) 

  

  const {  errorMessage, isError ,setUserStore,setError, isLoggedIn,reset} = useAuth()
  const navigate = useNavigate()

  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
  }

  useEffect(() => {
    if(isError) {
      setError(errorMessage)
    }
    if(isLoggedIn) {
      navigate('/')
      window.location.reload()
    }
    reset();
  },[isLoggedIn])

  const handleRegister = async (e :any) => {
    e.preventDefault();

    const user : User = {
      name: fields.name as string,
      email: fields.email as string,
      password: fields.password as string
    }
    try {
      const response = await authService.register(user)
        setUserStore({name:response.name})
        console.log(isLoggedIn)
      
      
    } catch (error : any) {
      const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
      setError(message)
    }


    
  };

  const onFinish = async (values:any) => {
    console.log(values)
    try {
      const response = await authService.register(values)
        setUserStore({name:response.name})
        console.log(isLoggedIn)
      
      
    } catch (error : any) {
      const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
      setError(message)
    }
  }

  const onFinishFailed = async (values:any) => {

  }

  return (
    <>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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
        {errorMessage}
      </Form.Item>
    </Form>
    </>
  )
}
