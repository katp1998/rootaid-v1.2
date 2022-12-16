import { signUp, logIn, } from '../../src/services/user.service'
import{auth} from 'keycloak-connect-graphql'

export const resolver = {
    
    login:  async ({ name, password }: any) =>
    { 
        try {
            const data = await logIn({ name, password });
            console.log(data)

            return data;
            
        } catch (error : any) {
            throw new Error( error.message)
        }

    },

    register: async ({ name, email, password }: any) =>
    {
        try {
            const data = await signUp({ name, email, password });
            console.log(data)

            return data;

        } catch (error :any ) {
            console.log(error.message)
            throw new Error(error.message)
            
        }       
    },

    // Protect
    
    protect: auth(() => {
        return {message:"Protected route"};
    })
}
