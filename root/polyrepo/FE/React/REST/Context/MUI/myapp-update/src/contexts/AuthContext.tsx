import  { createContext, useState , useEffect , useContext} from 'react'
import authService from '../api/authService'
import { User } from "../types/user.type";

const userExist = JSON.parse(localStorage.getItem('user') as string) 

interface UserStore {
    name: string,
    email?: string,
    accessToken? : string
}

interface IAuth {
    user? : UserStore
    isError:boolean
    loading:boolean
    errorMessage:string
    isLoggedIn: boolean
    setUserStore: (user: UserStore) => void
    setError: (error: string) => void
    reset: () => void
    logout: () => void

}

const AuthContext = createContext<IAuth>({} as IAuth)

const AuthContextProvider = ({children} : any) => {
    const [user, setUser] = useState<UserStore>()
    const [errorMessage,setErrorMessage] = useState<any>()
    const [loading,setLoading] = useState<boolean>(false)
    const [isError,setIsError] = useState<boolean>(false)
    const [isLoggedIn, setLoggedIn]  = useState<boolean>(false)


    useEffect(() => {
        if (userExist) {
            setUser({name:userExist.name})
            setLoggedIn(true)
        }
    },[])

    const setUserStore = (user: UserStore) => {
        setUser(user)
        setIsError(false)
        setLoggedIn(true)
        setLoading(false)
        setErrorMessage('')
    }

    const reset = () => {
        setUser(undefined)
        setIsError(false)
        setLoggedIn(false)
        setLoading(false)
        setErrorMessage('')
    }

    const logout = () => {
        reset()
    }

    const setError = (error: string)=> {
        setErrorMessage(error)
    }

    return (
        <AuthContext.Provider value={{errorMessage,user,isError,isLoggedIn,loading,reset,logout,setError,setUserStore}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export {useAuth,AuthContextProvider}