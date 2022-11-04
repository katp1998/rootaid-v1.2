import create from "zustand";
import { persist } from 'zustand/middleware';


interface IUser{
    name: string,
    email:string
}

const userStore = create(
    persist(
        (set) => ({

            user: {
                name: '',
                email: ''
            },

            loggedIn: false,

            signinUser: (params: IUser) =>
                set((state: any) => ({
                    user: params,
                    loggedIn: true
                })),
            
            signOut: () =>
                set((state: any) => ({
                    user: {
                        name: '',
                        email: ''
                    },
            
                    loggedIn: false
        
                }))     

        }))
)
  
export default userStore;