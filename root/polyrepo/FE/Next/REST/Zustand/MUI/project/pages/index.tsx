import {
  useEffect,
  useState
} from 'react';
import { useRouter } from 'next/router'
import useAxiosPrivate from '../hooks/usePrivateRoute';
import authStore from '../store/authStore';

import styles from '../styles/Home.module.css'

export default function Home() {

  const [user, setUser] = useState<String>();
  const axiosPrivate = useAxiosPrivate();
  const router = useRouter()
  
  // zustand state
  const auth = authStore((state: any) => state.auth);
  
  useEffect(() => {
    if (auth.isAuthenticated)
    {
      let isMounted = true;
      const controller = new AbortController();
      

      const getUsers = async () =>
      {
        try {
          const response = await axiosPrivate.get('/private');
          console.log(response.data);
          isMounted && setUser(response.data.user.name);
        }
        catch (err)
        {
            console.error(err);
            router.push('/login');
        }
      }

      getUsers();
  
      return () => {
        isMounted = false;
        controller.abort();
      }
        
    }
  }, []);

  return (
    <>

    </>
  )
}
