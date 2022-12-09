import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
 
export const generatePassword = async (password : any) => {
  const data =  await bcrypt.hash(password, Number(process.env.SALT));
  return data;
};


export const validatePassword = async (enteredPassword : any, savedPassword : any ) => {
  const data = await bcrypt.compare(enteredPassword, savedPassword);
  return data;
};

export const generateToken = async (payload : any) => {
  const data = await jwt.sign(payload, `${process.env.ACCESS_TOKEN_SECRET_KEY}`, { expiresIn: '10m' } );
  return data;
};

export const generateRefreshToken = async (payload : any) =>{
  const data = await jwt.sign(payload, 'refreshkeysecret', { expiresIn :'2d' } );
  return data;
};



module.exports.FormatData = (data :any) => {
  if (data) {
    return { data };
  } else {
    throw new Error('Data Not found!');
  }
};