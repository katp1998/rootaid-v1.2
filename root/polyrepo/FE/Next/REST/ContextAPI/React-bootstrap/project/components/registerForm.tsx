import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { User } from '../types/user.type';

import Spinner from '../components/spinner/Spinner';

import  useAuth  from '../hooks/useAuth';
import authService from '../api/authService'

import styles from '../styles/Home.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const registerForm = () => {

    const { auth, setAuth } = useAuth();

    const [fields, setFields] = useState({
        name: "",
        email: "",
        password: "",
    }) 

    // const {username, email, password} = fields

    const [loading,setLoading] = useState<Boolean>(false)
    const [error,setError] = useState<String>('')

    const router = useRouter()

    const onChange =  (event:any) => {
        setFields({...fields, [event.target.name] : event.target.value});
        // setError('')
    }

//     const onChange = (e: any) => {
//     setFields((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

    useEffect(() => {
        // if(isError) {
        //   setError(errorMessage)
        // }
        if(auth.isLoggedIn) {
            router.push('/')
        //window.location.reload()
        }
    
    },[auth])

    const handleRegister = async (e :any) => {
        e.preventDefault();
        setError('')
        setLoading(true)
        const user : User = {
        name: fields.name as string,
        email: fields.email as string,
        password: fields.password as string
        }
        try {
        const response = await authService.register(user)
        
        const name = response?.data?.name
        const accessToken = response?.data?.accessToken

        
        setAuth({accessToken,isLoggedIn:true})
            
        } catch (error : any) {
        const message = error.response && error.response.data.error ? error.response.data.error : 'Something went wrong'
        setError(message)
        }
        setLoading(false)
    };

  return (
    <Form className={styles.form} onSubmit={handleRegister}>
      <Form.Group className="mb-4" controlId="username">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" name='username' onChange={onChange} value={fields.name} />
      </Form.Group>

      <Form.Group className="mb-4" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={onChange} value={fields.email} />
      </Form.Group>

      <Form.Group className="mb-4" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" name='password' onChange={onChange} value={fields.password}/>
      </Form.Group>

      <Button variant="primary" type="submit" className={styles.btn}>
        Submit
      </Button>
    </Form>
  )
}
export default registerForm