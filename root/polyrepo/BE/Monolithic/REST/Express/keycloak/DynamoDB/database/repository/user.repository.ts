import { User } from '../models/user.models'
import { v4 as uuid } from 'uuid';


// Register user
export const createUser = async ({ name, email, password }: any) => {
    try {
        const newUser = await User.create({
            "userid": uuid(),
            "name": name,
            "email": email,
            "password": password
        });
        return newUser;

    } catch (error)
    {
        console.log(error); 
        
    }
    
}
    
// find user bby email
export const findUser = async ({ email }: any) => {
    try {
        const existingUser = await  User.scan('email').contains(email).exec();
        return existingUser[0];
    } catch (error) {
        console.log(error);     
    }
}

export const  findUserByUsername =async ({name} : any)=>{
    try {
        const existingUser = await User.scan('name').contains(name).exec();;
        return existingUser[0];

    } catch (error)
    {
        console.log(error);     
    }

}
    

