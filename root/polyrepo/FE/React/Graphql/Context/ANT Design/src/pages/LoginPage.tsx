import  { useState, useEffect } from 'react'
import { gql, useQuery } from '@apollo/client'
import { useNavigate } from "react-router-dom";
import authService from '../api/authService';
import { User } from "../types/user.type";
import { Button, Checkbox, Form, Input } from 'antd';
import styles from '../styles/Home.module.css'
import { useAuth } from '../contexts/AuthContext';


export default function LoginPage() {

  const [fields,setFields] = useState<User>({
      email: '',
      password: ''
  })

  

  const {setUserStore,setError,reset,isError,errorMessage,isLoggedIn} = useAuth()
  const navigate = useNavigate();

  const onChange =  (event:any) =>{
    setFields({...fields, [event.target.name] : event.target.value});
    setError('')
  }

  useEffect(() => {
    if(isError) {
      setError(errorMessage)
      console.log(errorMessage)
    }
    if(isLoggedIn) {
      navigate('/')
      window.location.reload()
    }
    reset()
    console.log("reset run")
  },[isLoggedIn])

  const LOGIN_QUERY = gql`
  query Login($email: String!, $password: String!) {
      login(email: $email, password: $password) {
          token,
          id,
          name
      }
  }
`

const { loading, error, data } = useQuery(LOGIN_QUERY, {
  variables: {
    email: fields.email,
    password: fields.password
  }
});


  const handleLogin = (e :any) => {
    e.preventDefault();

    if(data){
      localStorage.setItem('user',JSON.stringify(data))
      setUserStore({name:data.login.name,email:fields.email})
    }


    if(error) {
    setError(error.message)
    console.log(error.message)
    }
    // loginUser({variables:fields});
    // if(!loading){
    //   if(data){
    //     console.log(data.login.name)
    //     localStorage.setItem('user',JSON.stringify(data))
    //     setUserStore({name:data.login.name,email:fields.email})
    //   }
    //   if(error) {
    //     setError(error.message)
    //     console.log(error.message)
    //   }
    // }
  }

  const onFinish = async (values:any) => {
    if(data){
      localStorage.setItem('user',JSON.stringify(data))
      setUserStore({name:data.login.name,email:fields.email})
    }


    if(error) {
    setError(error.message)
    console.log(error.message)
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
            label="email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
            className={styles.formGroup}
          >
            <Input
            name='email'
            value={fields.email}
            onChange={onChange}
            />
          </Form.Item>
    
          <Form.Item
            label="password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            className={styles.formGroup}
          >
            <Input.Password
            name='password'
            value={fields.password}
            onChange={onChange}
             />
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
