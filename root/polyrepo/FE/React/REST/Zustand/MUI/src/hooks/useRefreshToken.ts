import axios from '../api/axios';
import authStore from '../store/authStore';

const useRefreshToken = () => {
    const { auth, setAuth } = authStore((state: any) => ({
        auth: state.auth, setAuth: state.setAuth
    }));

    const refresh = async () => {

        const response = await axios.get('/refreshtoken', {
            withCredentials: true
        });
        
        setAuth({
            accessToken: response.data.accessToken,
            isAuthenticated: true
        });

        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;