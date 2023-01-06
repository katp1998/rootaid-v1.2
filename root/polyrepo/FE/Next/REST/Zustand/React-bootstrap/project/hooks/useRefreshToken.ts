import axios from '../pages/api/axios';
import authStore from '../store/authStore';

const useRefreshToken = () => {
    const {auth , setAuth} = authStore((state:any) => ({ auth: state.auth ,setAuth:state.setAuth}));

    const refresh = async () => {

        try {
            const response = await axios.get('/refreshtoken', {
                withCredentials: true
            });

            setAuth({
                accessToken: response.data.accessToken,
                isLoggedIn: true
            });

            console.log(`Access token succesfully set in global state.
            access token:${auth.accessToken}`);
            return response.data.accessToken;        
        } catch (error) {
            console.log(`Error occured while setting refresh token to global state:
            ${error}`) 
        }

    }

    return refresh;
};

export default useRefreshToken;