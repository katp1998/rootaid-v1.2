import { Typography } from '@mui/material';
import {
    useEffect,
    useState
  } from 'react'
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/usePrivateRoute';
  
  
export default function HomePage() {
  
  const [user, setUser] = useState<String>();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useAuth();
  
  useEffect(() => {
  
    if (auth.isAuthenticated)
    {
      let isMounted = true;
      const controller = new AbortController();

      const getUsers = async () => {
        try {
          const response = await axiosPrivate.get('/private', {
            signal: controller.signal
          });
          console.log(response.data);
          isMounted && setUser(response.data.user.name);
        }
        catch (err)
        {
          console.error(err);
          navigate('/login');
        }
        
      }
      getUsers();
      
      return () => {
        isMounted = false;
        controller.abort();
      }
  
    }
      
  }, [auth]);
  
    return (
      <>
        <div>  
          <Typography fontSize={30} style={{ color: "#200f5f" }} fontWeight='bold' padding={3} textAlign="left">
            Welcome {user && user} !
          </Typography>
        </div>
      </>
  )
}
  
  