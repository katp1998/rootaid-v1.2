
import create from "zustand";
import {
    persist,
    devtools
} from 'zustand/middleware';


interface AuthState {
    accessToken? :string
    isAuthenticated: boolean
}

interface IAuth{
    auth: AuthState,
    setAuth:(authSet: AuthState) => void
}

const authStore = create<IAuth>()(
    devtools(
        persist((set) => ({
            auth: {
                accessToken: '',
                isAuthenticated: false
            },
            setAuth: (authSet: any) => set(
                (state :any) => ({ auth: { ...state.auth, accessToken: authSet.accessToken, isAuthenticated: authSet.isAuthenticated } })
            ),

        }), {name:'auth'}
        )
    )
);

export default authStore;