import {
    genSaltSync,
    hashSync
} from 'bcrypt';

export const encodePassword = async (rawPassword: string) => {
    const SALT = await genSaltSync();

    return hashSync(rawPassword, SALT);
} 