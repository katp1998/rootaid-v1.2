import {
    useEffect,
    useState
  } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/usePrivateRoute';
import styles from '../styles/Home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { isUserLogin } from '../Redux/Actions/authActions';
    
export default function HomePage()
{
  const [user, setUser] = useState<String>();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const dispatch: Dispatch<any> = useDispatch();
    
  // redux state state
  const auth = useSelector((state: any) => state.authUser);

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
        catch (err) {
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
    else
    {
      dispatch(isUserLogin());
    }
      
  },
    [auth]);
    
  return (
    <>
      <div>
        <h3 className={styles.username}>
          Welcome {user && user} !
        </h3>
      </div>
    </>
  )
}
  
    
    