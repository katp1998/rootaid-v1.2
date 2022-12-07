import {useState,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import authService from '../api/authService';
import { User } from '../types/user.type';


import { Button, Checkbox, Form, Input } from 'antd';
import styles from '../styles/Home.module.css'


import useStore from '../store/store';

export default function LoginPage() {

  const setUser = useStore((state:any) => state.setUser)
  const setLoading = useStore((state:any) => state.setLoading)
  // const setError = useStore((state:any) => state.setError)
  // const error = useStore((state:any) => state.user.error)

  const [error,setError] = useState('')
  
  const [fields,setFields] = useState({
    name: '',
    email:'',
    password: ''
  }) 

  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
    setError('')
  }

  const navigate = useNavigate();

  useEffect(() =>  {
    setError('')
    const user = authService.getCurrentUser();

    if (user) {
      navigate("/");
      window.location.reload();
    }

  },[])

  const handleRegister = async (e :any) => {
    e.preventDefault();
    try {
      const user : User = {
        email: fields.email as string,
        password: fields.password as string
      } 
      const response  = await authService.register(user)
      if(response.data.error){
        setError(response.data.error)
      }else{
        setUser({email:fields.email,name:response.data.name,isLoggedIn:true})
        setError('')
        navigate("/");
        window.location.reload();
      }

    } catch (error) {
        setError('Internal Server Error')
    }
      
  };

  const onFinish = async (values:any) => {
    console.log(values)
    try {
      const response  = await authService.register(values)
      if(response.error){
        setError(response.error)
      }else{
        setUser({email:fields.email,name:response.name,isLoggedIn:true})
        setError('')
        navigate("/");
        window.location.reload();
      }

    } catch (error : any) {
         const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
         setError(message)
        //setError('Internal Server Error')
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
        {error}
      </Form.Item>
    </Form>
    </>
  )
}