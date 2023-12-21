import dotenv from "dotenv";
dotenv.config({path:"src/.env"})
import jwt from "jsonwebtoken";
import User from '../models/User.js'


const protectRoute = async (req,res,next) =>{
    console.log("Hola desde el middleware")
    //Verificar la existencia de un token
    const { _token } = req.cookies
    if(!_token){
        return res.redirect('/login')
    }
    //Verificar el token 
    try {
        const decodedJWT = jwt.verify(_token, process.env.JWT_HASHSTRING)
        //console.log(decodedJWT)
        const loggedUser = await User.findByPk(decodedJWT.userId)
        if(!loggedUser){
            //console.log("El usuario no existe")
            return res.clearCookie("_token").redirect("/login")
        }else{
            req.User = loggedUser
            
        }
    } catch (error) {
        return res.clearCookie("_token").redirect("/login")
    }
    next()
}



export default protectRoute;