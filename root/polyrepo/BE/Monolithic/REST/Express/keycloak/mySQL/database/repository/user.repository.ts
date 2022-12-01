import { User } from '../models/user.models'


// Register user
export const createUser = async ({ name, email, password }: any) => {
    try {
        const user = await User.save({
            name,
            email,
            password
        });
        return user;

    } catch (error)
    {
        console.log(error); 
        
    }
    
}
    
// find user bby email
export const findUser = async ({ email }: any) => {
    try {
        const existingUser = await User.findOne({ where: { email } });
        return existingUser;
    } catch (error) {
        console.log(error);     
    }
}

export const  findUserByUsername =async ({name} : any)=>{
    try {
        const existingUser = await User.findOne({ where: { name } });
        return existingUser;

    } catch (error)
    {
        console.log(error);     
    }

}
    

