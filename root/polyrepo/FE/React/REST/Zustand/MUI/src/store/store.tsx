import create from "zustand";
import {persist,devtools} from 'zustand/middleware'

const userExist = JSON.parse(localStorage.getItem('user') as string)

interface UserStore {
  name:string,
  email?: string
}

interface IAuth {
    user?: UserStore
    isError:boolean
    loading:boolean
    errorMessage:string
    isLoggedIn: boolean
    setUserStore: (userSet: UserStore) => void
    setError: (error : string) => void
    reset: () => void
    logout: () => void

  }
  
  const useStore = create<IAuth>()(devtools(persist((set) => ({
    user:{
      name:'',
      email: ''
    },
    isError:false,
    loading:false,
    errorMessage:'',
    isLoggedIn:false,

    setUserStore: (userSet) => set((state) => ({ user:{...state.user , name:userSet.name, email:userSet.email}, isLoggedIn:true })),
    setError: (error) => set((state) => ({errorMessage: error, isError:true})),
    reset: () => set((state => ({user:undefined,isError:false,loading:false,errorMessage:'',isLoggedIn:false}))),
    logout: () => set((state => ({user:undefined,isError:false,loading:false,errorMessage:'',isLoggedIn:false})))
    // setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
    // setLoading: (loading) => set((state) => ({ user: { ...state.user, isLoading: loading } })),
    // setError: (error) => set((state) => ({ user: { ...state.user, error: error } })),
  })))) 

 
  
  export default useStore
  