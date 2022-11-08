const userModel = require("../models/userModel")

const userRepository = {
    createUser  : async ({name,email,password,salt}) =>{
        try {

            const user = new userModel({
                name,
                email,
                password,
                salt
            })
            
            userResult = await user.save()

            return userResult


        } catch (error) {
            
        }
    },
    findUser : async ({email})=>{
        try {
            const existingUser = await userModel.findOne({email : email})
            return existingUser
        } catch (error) {
            
        }
    },
    findUserById : async ({id}) =>{
        try {
            const existingUser = await userModel.findById(id)
            .populate('name')
            .populate('email')

            return existingUser

        } catch (error) {
            
        }
    }
}


module.exports = userRepository