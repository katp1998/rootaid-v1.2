import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const {auth , setAuth} = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refreshtoken', {
            withCredentials: true
        });
        setAuth({
            accessToken:response.data.accessToken,
            isLoggedIn:true
        })
        // setAuth(prev => {
        //     console.log(JSON.stringify(prev));
        //     console.log(response.data.accessToken);
        //     return { ...prev, accessToken: response.data.accessToken }
        // });
        console.log(auth.accessToken)
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;