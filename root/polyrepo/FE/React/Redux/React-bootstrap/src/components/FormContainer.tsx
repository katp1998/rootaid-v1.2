import React, { ReactNode } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

//Defining props:
interface Props{
    children?: ReactNode
}


function FormContainer ({children}: Props) {
  return (
    <Container className='py-3'>
        <Row className='justify-content-md-center'>
            <Col xs={12} md={6}>
                {children}
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer