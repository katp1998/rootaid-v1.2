import { User } from '../models/user.model';
  
  //@desc CREATING USER
  //@route POST /api/v1.2/auth/create
  export const createUser = async ({id,name, email, password}: {id: string, name: string, email: string, password: string}) => { //types to be tested in integration between service and controller files
      try {

        const user = await User.create({id, name, email, password});
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
          name: scanUser[0].name,
        }
        return existingUser
    } catch (error) {
        console.log(error)
    }
} 

 export const  findUser = async (email : string)=>{
        try {
            const existingUser = await User.scan("email").contains(email).exec()    
            return existingUser
        } catch (error) {
            console.log(error)
        }   
}

export const saveRefreshToken =async (userID: string , refreshToken :string) => {
    try {
        const updatedUser = await User.update({id: userID, refreshToken})
        
    } catch (error) {
        return error 
    }

    

}

export const removeRefreshToken = async (refreshToken : string) => {
    try {
        const user = await findUserByToken(refreshToken)
        const id  = user?.id
        
        const updatedUser = await User.update({id: id, refreshToken: ''})  
        

    } catch (error) {
        console.log(error)
    }
}    

export const findUserById  =async (userID:string) => {
    try {
        const scanUser  = await User.scan("id").contains(userID).exec()
        return scanUser[0]
    } catch (error) {
        console.log(error)
    }
}


