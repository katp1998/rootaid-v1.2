import { User } from '../models/user.model';
  
  //@desc CREATING USER
  //@route POST /api/v1.2/auth/create
  export const createUser = async ({name, email, password}: { name: string, email: string, password: string}) => { //types to be tested in integration between service and controller files
      try {

        const user = await User.create({ name, email, password});
        return user

      } catch (error) {
        console.log(error)
        return error
      }

}

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

 export const  findUser = async (email : string)=>{
        try {
            const existingUser = await User.scan("email").contains(email).exec() 
            console.log(existingUser)
            return existingUser
        } catch (error) {
            console.log(error)
        }   
}

export const saveRefreshToken =async (userID: string , refreshToken :string) => {
    
    const updatedUser = await User.update({id: userID, refreshToken})

     console.log(updatedUser)
    

}

export const removeRefreshToken = async (refreshToken : string) => {
    try {
        const user = await findUserByToken(refreshToken)
        const id  = user?.id
        
        const updatedUser = await User.update({id: id, refreshToken: ''})  
        
        console.log(updatedUser)

    } catch (error) {
        console.log(error)
    }
}