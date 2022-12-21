import * as bcrypt from 'bcrypt';
import config from '../../config';
 


export const hashPassword = async (password : string) => {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, SALT);
};


export const validatePassword = async (enteredPassword : any, savedPassword : any ) => {
        return await bcrypt.compare(enteredPassword,savedPassword)
};

export const generateToken = async (payload : any) => {
        return await jwt.sign(payload,`${config.accessTokenKey}` , { expiresIn: '1d'} )
}

export const generateRefreshToken = async (payload : any) =>{
        return await jwt.sign(payload, `${config.refreshTokenKey}`, {expiresIn :'2d'} )
}



module.exports.FormateData = (data :any) => {
        if(data){
            return { data }
        }else{
            throw new Error('Data Not found!')
        }
    }