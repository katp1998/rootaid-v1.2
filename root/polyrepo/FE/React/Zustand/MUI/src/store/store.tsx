import create from "zustand";
import {persist,devtools} from 'zustand/middleware'

interface IStore {
    user: {
      name: string
      email: string
      isLoggedIn: boolean
      isLoading:boolean
      error:string
    }
    setUser: (user: IStore['user']) => void
    setLoading: (isLoading: boolean) => void
    setError: (error: string) => void
  }
  
  const useStore = create<IStore>()(devtools(persist((set) => ({
    user: {
      name: 'empty',
      email: 'empty',
      isLoggedIn: false,
      isLoading: false,
      error: '',
    },
    setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
    setLoading: (loading) => set((state) => ({ user: { ...state.user, isLoading: loading } })),
    setError: (error) => set((state) => ({ user: { ...state.user, error: error } })),
  })))) 

 
  
  export default useStore
  