import { v4 as uuid } from 'uuid';
import { User } from '../models/user.model';


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
    
// find user by email
export const findUserByEmail = async ({ email }: any) => {
    try {
        const existingUser = await  User.scan('email').contains(email).exec();
        return existingUser[0];
    } catch (error) {
        console.log(error);     
    }
}

// find user by username
export const  findUserByUsername =async ({name} : any)=>{
    try {
        const existingUser = await User.scan("name").contains(name).exec();  
        console.log("rfghjkm");
        console.log(existingUser);
        return existingUser[0];

    } catch (error)
    {
        console.log("here u can find");     
    }

}


//@desc FIND USER BY TOKEN
//@route POST
export const findUserByToken = async (RefreshToken: string) => {
    try {
      const existingUser = await User.scan("refreshToken").contains(RefreshToken).exec();
      return existingUser[0];
    }
    catch (error) { 
        console.log(error);
    }
  };
  
  //@desc SAVING REFRESH TOKEN
  //@route POST
export const saveRefreshToken = async (
    userID: string,
    RefreshToken: string
) => {
    console.log(userID +"name");
    //finding the user according to ID and update:
    await User.update(
        {
            userid: userID,
            refreshToken: RefreshToken
        });
};
      
  //@desc REMOVING REFRESH TOKEN
  //@route POST
export const removeRefreshToken = async (RefreshToken: string) => {
    try {
        const user = await findUserByToken(RefreshToken);
        if (user) {
            const result = await User.update(
                {
                    userid: user.userID,
                    refreshToken: ''
                });
            console.log(result);
        }
    }
    catch (error) {
        console.log(error);
     }
  };
    

