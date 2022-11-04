import React,
{
    createContext,
    useState
} from 'react'

interface IUser{
    name: string,
    email:string
}

interface userDetails{
    user: IUser,
    loggedIn: boolean,
    login: (user: IUser) => void,
    logout: () => void
}

const contextDefaultValues: userDetails = {
    user: {
        name: '',
        email: ''
    },
    loggedIn: false,
    login: () => {},
    logout: () => {}
    
}

const UserContext = createContext<userDetails>(contextDefaultValues);

const UserContextProvider = (props: any) => {
        
    const [loggedIn,
        setLoggedIn] = useState(contextDefaultValues.loggedIn);
        
    const [user,
        setUser] = useState(contextDefaultValues.user);

    const login = (details: IUser) => {
        setUser(details);
        setLoggedIn(true);
    }
    
    const logout = () => {
        setLoggedIn(false);
      }

  return (
      <UserContext.Provider value={{ login, loggedIn, logout, user }}>
          {props.children}
      </UserContext.Provider>
    )
    
}

export {
    UserContextProvider,
    UserContext
};
    
