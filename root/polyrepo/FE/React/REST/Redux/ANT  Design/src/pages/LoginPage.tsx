import {
    useState,
    useEffect
  } from 'react';
import { useNavigate } from "react-router-dom";
import { User } from '../types/user.type';
import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux';
import { login } from '../features/auth/authSlice';
import {
    Button,
    Form,
    Input
} from 'antd';

  
export default function Login()
{  
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
  
  // redux state
  const auth = useSelector((state: any) => state.auth);
  
  const [fields, setFields] = useState<User>({
    email: '',
    password: ''    
  });

  const onChange = (event: any) =>
  {
    setFields({ ...fields, [event.target.name]: event.target.value });
  }

    // Submit form
  const handleLogin = async (values: any) =>
  {

    const user: User =
    {
      email: values.email as string,
      password: values.password as string
    }
    
    dispatch(login(user));

  };
  
  useEffect(() =>
  {
    if (auth.isAuthenticated)
    {
      navigate('/');
    }
  }, [auth]);
  
  return (
    <>  
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={handleLogin}
        autoComplete="off"
        className={styles.form}
        layout="vertical"
      >

        <h3 className={styles.title}>Login</h3>

        {/* Email */}
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
        
        {/* Submit btn */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
          <Button className={styles.btn} htmlType="submit">
            Submit
          </Button>

        </Form.Item>
        {auth.errMessage &&
          <Form.Item className={styles.error}>
            {auth.errMessage} !
          </Form.Item>}
      </Form>

  </>
  )
}
  
   
  