import { Dispatch } from 'redux';
import axios from '../api/axios';
import { useDispatch } from 'react-redux'
import { setAccessToken} from '../features/auth/authSlice';


const useRefreshToken = () =>
{
    const dispatch: Dispatch<any> = useDispatch();

    const refresh = async () => {
        const response = await axios.get('/refreshtoken', {
            withCredentials: true
        });

        dispatch(setAccessToken(response.data.accessToken));
        console.log("new accesstoken", response.data.accessToken);
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;