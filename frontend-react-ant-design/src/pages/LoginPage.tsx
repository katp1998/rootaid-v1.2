import React from 'react'
import { Button, Form, Input, Card, Col, Row  } from 'antd';
import 'antd/dist/antd.css';

const LoginPage = () => {
  return (
    <div className="site-card-wrapper">
    <Row justify="center" gutter={[16, 16]}>
      <Col span={6} >
        <Card title="LOGIN" bordered={true} >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" block danger htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  </div>
    
  )
}

export default LoginPage