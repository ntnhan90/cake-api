import { compare, hash } from 'bcrypt';
const saltRounds = Number(process.env.BCRYPT_ROUNDS) || 10

export const hashPassword = async (password: string) => {
    try {
        return await hash(password, saltRounds);
    } catch (err) {
        console.error(err);
        throw new Error('Can not hash password.');
    }
};

export const verifyPassword =  (password: string,hash: string)=> {
   return compare(password, hash)
};
