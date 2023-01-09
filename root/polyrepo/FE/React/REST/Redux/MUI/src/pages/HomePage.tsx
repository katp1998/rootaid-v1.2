import {
    useEffect,
    useState
  } from 'react';
import useAxiosPrivate from '../hooks/usePrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { isUserLogin } from '../features/auth/authSlice';
import { Typography } from '@mui/material';
    
export default function HomePage()
{
  const [user, setUser] = useState<String>();
  const axiosPrivate = useAxiosPrivate();
  const dispatch: Dispatch<any> = useDispatch();
    
  // redux state state
  const auth = useSelector((state: any) => state.auth);

  useEffect(() =>
  {   
    if (auth.isAuthenticated) {
        let isMounted = true;
        const controller = new AbortController();
    
        const getUsers = async () => {
          try {
            const response = await axiosPrivate.get('/private',
              {
                signal: controller.signal
              });
            
            isMounted && setUser(response.data.user.name);
          }
          catch (err)
          {
            console.error(err);
          }
        }
    
        getUsers();
      
        return () => {
          isMounted = false;
          controller.abort();
        }
            
      }
      else
      {
        dispatch(isUserLogin());
      }
  },
    [auth]);
    
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

  
    
    