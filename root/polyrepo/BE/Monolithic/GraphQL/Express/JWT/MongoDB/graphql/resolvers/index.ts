import {signUp, logIn,} from '../../src/services/user.service'

export const resolver = {
    async login({email,password}:any) {
        try {
            const data = await logIn({email,password})
            console.log(data)
            return data
        } catch (error : any) {
            throw new Error( error.message)
        }

    },

    async register({name,email,password}:any){
        try {
            const data = await signUp({name,email,password})
            console.log(data)
            return data
        } catch (error :any ) {
            console.log(error.message)
            throw new Error(error.message)
            
        }       
    }
}
