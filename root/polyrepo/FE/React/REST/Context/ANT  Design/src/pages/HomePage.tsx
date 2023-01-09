import {
    useEffect,
    useState
  } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/usePrivateRoute';
import styles from '../styles/Home.module.css';
  
export default function HomePage()
{
  const [user, setUser] = useState<String>();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useAuth();
  
  useEffect(() => {
    if (auth.isAuthenticated) {
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
  }, [auth])
  
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
  
  