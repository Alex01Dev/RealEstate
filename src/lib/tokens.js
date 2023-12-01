import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path: "src/.env"});

//Token ID Propio para creacion de usuarios y restablecer password
const generateID = () => Date.now().toString(32) + Math.random().toString(32).substring(3);


//JWT Authentication
const jwtToken = (userId) => jwt.sign({
    domain: process.env.JWT_DOMAIN,
    author: process.env.JWT_AUTHOR,
    signature: process.env.JWT_SIGNATURE,
    year: process.env.JWT_YEAR,
    userId: userId
 }, process.env.JWT_HASHSTRING,
 {
    expiresIn: '1d'
 });

 export {
    generateID,
    jwtToken
};


