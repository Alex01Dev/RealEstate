import bycript from bycript;
import dotenv from 'dotenv';

dotenv.config({ path: "src/.env" });

const users = [
    {
        name: 'Alejandro', 
        email: 'romerito69@gmail.com',
        password: bcrypt.hashSync('12345678',10)
    },
]

export default users;