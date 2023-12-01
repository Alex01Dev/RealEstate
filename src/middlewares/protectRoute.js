
const protectRoute = async (request,response,next) =>{

    console.log("Hola desde Middlewares");
    
    //protector de ruta
    const {_token} = request.cookies;
    if(!_token){
        return response.redirect('/login')

    }
    //TODO: Verificar el token
    try {
        const decodeJWT = jwt.verify(_token, process.env.JWT_HASHINSTRING)
        console.log(decodeJWT);

        

        const loggedUser = User.findByPk(decodeJWT.userID);
        if(!loggedUser){
            return response.redirect("/login")
        }
        
    } catch (error) {
        return response.clearCookie("_token").redirect('/login');
    }
    
    next();

}

export default protectRoute;