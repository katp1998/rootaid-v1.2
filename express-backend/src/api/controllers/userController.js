const userService = require('../../services/userService')


const userController = {
    registerUser : async (req,res,next) =>{
        try {
            const {name,email,password} = req.body
            const {data} = await userService.signUp({name,email,password})
            return res.json(data)
        } catch (error) {
            next(err)
        }
       

    },
    loginUser  : async (req,res,next) =>{
        try {
            const {email,password} = req.body
            const {data} = await userService.login({email,password})
            return res.json(data)
        } catch (error) {
            next(err)
        }
    }
}

module.exports = userController