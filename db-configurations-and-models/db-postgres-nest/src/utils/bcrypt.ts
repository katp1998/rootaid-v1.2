import {
    genSaltSync,
    hashSync
} from 'bcrypt';

export async function encodePassword  (rawPassword: string) {
    const SALT =genSaltSync();

    return hashSync(rawPassword, SALT);
} 