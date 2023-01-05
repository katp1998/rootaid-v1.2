import {useState, useEffect} from 'react'
import { User } from '../types/user.type';
import { useRouter } from 'next/router'

import  useAuth  from '../hooks/useAuth';
import authService from '../api/authService'

import styles from '../styles/Home.module.css'
import { Button, Form, Input } from 'antd';

const RegisterForm = () => {

  const [fields,setFields] = useState({
    email:'',
    password: ''
  })
  
  const { auth, setAuth } = useAuth();

const [loading, setLoading] = useState<Boolean>(false)    
const [error, setError] = useState<String>('')

    const router = useRouter()

  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
    setError('') // set error state to empty
  }

    useEffect(() => {
        // if(isError) {
        //   setError(errorMessage)
        //   console.log(errorMessage)
        // }
        if(auth.isLoggedIn) {
            router.push('/')
            //window.location.reload()
        }
    },[auth])

    const onFinish = async (values:any) => {
        console.log(values)
        setError('')
        setLoading(true)

        const user : User = {
          email: fields.email as string,
          password: fields.password as string
        }
        
        try {
        const response = await authService.login(user)

        const name = response?.data?.name
        const accessToken = response?.data?.accessToken

        setAuth({accessToken,isLoggedIn:true})
        } catch (error : any) {
          const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
          setError(message)
        }
    }
    
      const onFinishFailed = async (values:any) => {
        
      }       

  return (
    <>
    <h2 className={styles.title}>Register</h2>
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
  );
};

export default RegisterForm;