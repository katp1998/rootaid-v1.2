import  {useState ,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from '@apollo/client'
import { useAuth } from '../contexts/AuthContext';
import authService from '../api/authService';
import { User } from '../types/user.type';

import { Button, Checkbox, Form, Input } from 'antd';
import styles from '../styles/Home.module.css'

export default function RegisterPage() {

  const {errorMessage, isError ,setUserStore,setError, isLoggedIn,reset} = useAuth()
  const navigate = useNavigate();

  const [fields,setFields] = useState<User>({
      name: '',
      email:'',
      password: '' 
    }) 

  const onChange =  (event:any) =>{
      setFields({...fields, [event.target.name] : event.target.value});
      setError('')
    }

  useEffect(() =>  {
    if(isError) {
      setError(errorMessage)
    }
    if(isLoggedIn) {
      navigate('/')
      window.location.reload()
    }
    reset()
    },[isLoggedIn])

    const REGISTER_QUERY = gql`
        mutation Register(
            $name: String!,
            $email: String!,
            $password: String!
            ) {
            register(
                name: $name,
                email: $email,
                password: $password
                ){
                token,
                id,
                name
            }
        }` 


    const [addUser, { loading}] = useMutation(REGISTER_QUERY, {
        update(proxy, result){
          if(loading){            
          }else{
            console.log(result.data.register.name)
            localStorage.setItem('user',JSON.stringify(result.data))
            setUserStore({name:result.data.register.name, email:fields.email})
          }
        },
        onError({graphQLErrors}){
          const message = graphQLErrors.at(0)?.message
          setError(message as string)
          console.log(message)
          console.log(graphQLErrors)
        }
    })



    const handleRegister = (event :any )=>{
        event.preventDefault(); 
        addUser({variables:fields});
    }

    const onFinish = async (values:any) => {
      addUser({variables:values});
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




