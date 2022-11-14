import React, {SyntheticEvent, useEffect, useState} from 'react'
import {Card, Button, Form} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {reset} from '../features/auth/authSlice'
import { login } from '../features/auth/authService';

//IMPORTING COMPONENTS:
import FormContainer from '../components/FormContainer'

function LoginPage() {

  let navigate = useNavigate();
  let dispatch = useDispatch();

  //CONFIGURING STATES:
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  ///states from authSlice
  const {isError, isSuccess, isLoading, message} = useSelector((state) => state.auth)

  //monitor states
  useEffect(()=>{
    //if isError state = true
    if(isError){
      console.log(message)
    }
    //if isSuccess {and user} states = true
//if(user){navigate('/')} --> does not work
    if(isSuccess){
      navigate('/')
    }

    dispatch(reset())
  }, [isError, isSuccess, message, navigate, dispatch])


  const submitHandler = (e:SyntheticEvent) =>{
    e.preventDefault()

    /* INTERACTION WITH THE BACKEND REQUIRED TO BE INSERTED HERE **/
    const userData = { email, password}
    dispatch(login(userData))

    console.log("Submitted")

    //redirect user
    navigate("/")
  }


  return (
    <>
    <FormContainer>
      <Card>
      <Card.Header as="h1">LOGIN</Card.Header>
      <Card.Body>
        <Card.Text>
          <Form onSubmit={submitHandler}>
          <Form.Floating className="mb-3">
            <Form.Control
              id="floatingInputCustom"
              type="email"
              placeholder="name@example.com"
              value = {email}
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="floatingInputCustom">Email address</label>
          </Form.Floating>
          <Form.Floating>
            <Form.Control
              id="floatingPasswordCustom"
              type="password"
              placeholder="Password"
              value = {password}
              onChange={e => setPassword(e.target.value)}
            />
            <label htmlFor="floatingPasswordCustom">Password</label>
          </Form.Floating>
          <br />
          <Button variant="danger">Login</Button>
      </Form>
        </Card.Text>
      </Card.Body>
    </Card> 
</FormContainer>
</>
  )
}

export default LoginPage