
import create from "zustand";
import {
    persist,
    devtools
} from 'zustand/middleware';


interface AuthState {
    accessToken? :string
    isLoggedIn: boolean
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
                isLoggedIn: false
            },
            setAuth: (authSet: any) => set(
                (state :any) => ({ auth: { ...state.auth, accessToken: authSet.accessToken, isLoggedIn: authSet.isLoggedIn } })
            ),

        }), {name:'auth'}
        )
    )
);

export default authStore;