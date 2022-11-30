import { User } from '../models/user.schema';

//@DESC: FIND IF USER EXISTS
//@ROUTE: POST /api/v1.2/auth/
export const findUser =async (email:string) => {
  //CHECK IF USER WITH SAME EMAIL ADDRESS EXISTS
  try {
    const existingUser = await User.findOne({ where: { email } })
    return existingUser
    }
  catch (error) {
    console.log(error)
  }
}
  
  //@desc CREATING USER
  //@route POST /api/v1.2/auth/create
  export const createUser = async ({id, username, email, password}: {id: string, username: string, email: string, password: string}) => { //types to be tested in integration between service and controller files
      try {
          
        //CREATE USER:
        // const user = await User.save({
        //   name,
        //   email,
        //   password
        // })

        const user = await User.create({id, username, email, password});
        //RETURN SUCCESS RESPONSE
        return user

      } catch (error) {
        console.log(error)
        //RETURN UNSUCCESSFUL RESPONSE
        return error
      }


}