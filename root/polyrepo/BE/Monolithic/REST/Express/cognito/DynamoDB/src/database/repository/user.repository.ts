import { User } from '../models/user.schema';
  
  //@desc CREATE USER
  //@route POST /api/v1.2/auth/createUser
  export const createUser = async ({id, username, email, password}: {id: string, username: string, email: string, password: string}) => { //types to be tested in integration between service and controller files
      try {

        const user = await User.create({id, username, email, password});
        return user

      } catch (error) {
        console.log(error)
        return error
      }

}

  //@desc FIND USER BY TOKEN
  //@route POST /api/v1.2/auth/findUserByToken
export const findUserByToken = async (refreshToken : any) => {
    try {
        const scanUser = await User.scan("refreshToken").contains(refreshToken).exec()
        const existingUser = {
          id: scanUser[0].id,
          username: scanUser[0].username,
        }
        return existingUser
    } catch (error) {
        console.log(error)
    }
} 

  //@desc FIND USER BY USERNAME
  //@route POST /api/v1.2/auth/findUser
export const  findUser = async (username : string)=>{
        try {
            const existingUser = await User.scan("username").contains(username).exec()
            return existingUser
        } catch (error) {
            console.log(error)
        }
}

  //@desc SAVE REFRESH TOKEN
  //@route POST /api/v1.2/auth/saveRefreshToken
export const saveRefreshToken =async (userID: string , refreshToken :string) => {
    
    const updatedUser = await User.update({id: userID, refreshToken})

     console.log(updatedUser)
    

}

  //@desc REMOVE REFRESH TOKEN
  //@route POST /api/v1.2/auth/removeRefreshToken
export const removeRefreshToken = async (refreshToken : string) => {
    try {
        const userId = await (await findUserByToken(refreshToken)).id  
        
        const updatedUser = await User.update({id: userId, refreshToken: ''})  
        
        console.log(updatedUser)

    } catch (error) {
        console.log(error)
    }
}