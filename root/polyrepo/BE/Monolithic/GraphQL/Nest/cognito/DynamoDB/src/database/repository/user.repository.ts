import { User } from '../models/user.schema';
  
  //@desc CREATING USER
  //@route POST /api/v1.2/auth/create
  export const createUser = async ({id, username, email, password}: {id: string, username: string, email: string, password: string}) => { //types to be tested in integration between service and controller files
      try {

        const user = await User.create({id, username, email, password});
        return user

      } catch (error) {
        console.log(error)
        return error
      }

}