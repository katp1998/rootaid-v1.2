import {
    genSaltSync,
    hashSync,
} from 'bcrypt';

export const hashPassword = async (password: string) => {
    const SALT = await genSaltSync();

    return hashSync(password, SALT);
} 