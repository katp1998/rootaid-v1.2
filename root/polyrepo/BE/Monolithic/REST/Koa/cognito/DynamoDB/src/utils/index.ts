
import bcrypt from 'bcrypt';

 
export const generatePassword = async (password : any) => {

};

export const validatePassword = async (enteredPassword : any, savedPassword : any ) => {
  return await bcrypt.compare(enteredPassword, savedPassword);
};

module.exports.FormateData = (data :any) => {
  if (data) {
    return { data };
  } else {
    throw new Error('Data Not found!');
  }
};