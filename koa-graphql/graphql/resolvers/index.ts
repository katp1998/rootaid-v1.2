import {signUp, logIn,} from '../../src/services/user.service'

export const resolver = {
    async login({email,password}:any) {
        const data = await logIn({email,password})
        console.log(data)
        return data
    },

    async register({name,email,password}:any){
        const data = await signUp({name,email,password})
        console.log(data)
        return data
    }
}
