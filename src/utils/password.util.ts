import { compare, hash } from 'bcrypt';
const saltRounds = 10
export const hashPassword =  (password: string) => {
    try {
        return  hash(password, saltRounds);
    } catch (err) {
        console.error(err);
        throw new Error('Can not hash password.');
    }
};

export const verifyPassword =  (password: string,hash: string)=> {
   return compare(password, hash)
};
