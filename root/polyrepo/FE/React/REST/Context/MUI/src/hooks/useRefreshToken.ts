import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refreshtoken', {
            withCredentials: true
        });

        setAuth({
            accessToken: response.data.accessToken,
            isAuthenticated: true
        });

        console.log(auth.accessToken);
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;