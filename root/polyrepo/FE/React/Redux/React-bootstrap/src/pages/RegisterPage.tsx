import React, { SyntheticEvent, useState } from 'react'
import FormContainer from '../components/FormContainer'
import {Card, Button, Form} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


function RegisterPage() {

  let navigate = useNavigate();
  
  //CONFIGURING STATES:
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const submitHandler = async(e:SyntheticEvent) =>{
    e.preventDefault()

    /* INTERACTION WITH THE BACKEND REQUIRED TO BE INSERTED HERE: **/

    console.log("New account Submitted")

    //redirect user:
    navigate("/login")
  }
  
  return (
    <FormContainer>
      <Card>
      <Card.Header as="h1">REGISTER</Card.Header>
      <Card.Body>
        <Card.Text>
          <Form>
        <Form.Floating className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          type="name"
          placeholder="John Doe"
          value = {name}
          onChange={e => setName(e.target.value)}
        />
        <label htmlFor="floatingInputCustom">Name</label>
      </Form.Floating>
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
      <Button variant="danger">Register</Button>
      </Form>
        </Card.Text>
        
      </Card.Body>
    </Card> 
</FormContainer>
  )
}

export default RegisterPage