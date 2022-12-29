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
    
// find user by email
export const findUserByEmail = async ({ email }: any) => {
    try {
        const existingUser = await User.findOne({ where: { email } });
        return existingUser;
    } catch (error) {
        console.log(error);     
    }
}

// find user by username
export const  findUserByUsername =async ({name} : any)=>{
    try {
        const existingUser = await User.findOne({ where: { name } });
        console.log(name);
        return existingUser;

    } catch (error)
    {
        console.log(error);     
    }

}


//@desc FIND USER BY TOKEN
//@route POST
export const findUserByToken = async (RefreshToken: string) => {
    try {
      const existingUser = await User.findOneBy({ refreshToken: RefreshToken });
      return existingUser;
    } catch (error) {
      console.log(error);
    }
  };
  
  //@desc SAVING REFRESH TOKEN
  //@route POST
export const saveRefreshToken = async (
    userID: number,
    RefreshToken: string
) => {
//finding the user according to ID and update:
    await User.createQueryBuilder()
        .update(User)
        .set({ refreshToken: RefreshToken })
        .where("id = :id", { id: userID })
        .execute();
};
    
//@desc FINDING USER BY ID
//@route POST
export const findUserById = async (id: string) => {
    try {
      const existingUser = await User.createQueryBuilder("user")
        .where("id = :id", { id: id })
        .select(["user.password", "user.refreshToken"]);
      console.log(existingUser);
    } catch (error) {
      return {
        error: "error",
      };
    }
  };
  
  //@desc REMOVING REFRESH TOKEN
  //@route POST
  export const removeRefreshToken = async (RefreshToken: string) => {
    try {
      const user = await findUserByToken(RefreshToken);
      if (user) {
        user.refreshToken = "";
        const result = await user.save();
        console.log(result);
      }
    } catch (error) {}
  };
    

