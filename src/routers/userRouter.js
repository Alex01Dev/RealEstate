import express from 'express';
import { formLogin, fromRegister, fromRecovery, insertUser, confirmAccount, resetPassword, authenticateUser, changePassword, updatePassword, homePage} from '../controllers/userController.js';

const router = express.Router();

router.get('/', formLogin);
router.get('/register', fromRegister);
router.get('/recovery', fromRecovery);
router.post('/register', insertUser);
// router.get("/", (request,response) =>{
//     response.render("auth/login.pug",{
//         isLogged : true})
// });


//confirm account
router.get("/confirm/:token", confirmAccount);

//Reset password
router.post("/login/recovery", resetPassword);

// Change Password
router.get("/login/passwordChange/:tokenPassword", changePassword);
router.post("/login/update-password/:tokenPassword", updatePassword);

//Authenticate
router.post('/',authenticateUser);

//home
router.get('/home',homePage);

export default router;