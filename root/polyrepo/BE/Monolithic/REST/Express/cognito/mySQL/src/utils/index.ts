import * as bcrypt from 'bcrypt';
 
export const hashPassword = async (password : string) => {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, SALT);
};


export const validatePassword = async (enteredPassword : any, savedPassword : any ) => {
        return await bcrypt.compare(enteredPassword, savedPassword)
};

module.exports.FormateData = (data :any) => {
        if(data){
            return { data }
        }else{
            throw new Error('Data Not found!')
        }
}