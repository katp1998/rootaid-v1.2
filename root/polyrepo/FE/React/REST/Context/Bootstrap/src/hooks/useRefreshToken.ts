import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const {auth , setAuth} = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refreshtoken', {
            withCredentials: true
        });

        // Set value to context state
        setAuth({
            accessToken: response.data.accessToken,
            isAuthenticated: true
        });

        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;