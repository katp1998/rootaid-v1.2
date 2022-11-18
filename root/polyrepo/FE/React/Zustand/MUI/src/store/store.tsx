import create from "zustand";
import {persist,devtools} from 'zustand/middleware'

interface IAuth {
    user: {
      name: string
      email: string
      isLoggedIn: boolean
      isLoading:boolean
      error:string
    }
    
    setUser: (user: IAuth['user']) => void
    setLoading: (isLoading: boolean) => void
    setError: (error: string) => void
  }
  
  const useStore = create<IAuth>()(devtools(persist((set) => ({
    user: {
      name: '',
      email: '',
      isLoggedIn: false,
      isLoading: false,
      error: '',
    },
    setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
    setLoading: (loading) => set((state) => ({ user: { ...state.user, isLoading: loading } })),
    setError: (error) => set((state) => ({ user: { ...state.user, error: error } })),
  })))) 

 
  
  export default useStore
  