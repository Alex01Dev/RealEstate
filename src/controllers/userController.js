import { request, response } from "express";
import { check, validationResult } from "express-validator";
import { generatedID, jwtToken } from "../lib/tokens.js";
import { emailRegister, emailResetPassword } from "../lib/emails.js";
import cookieParser from "cookie-parser";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config({ path: "src/.env" });

const formLogin = (req, res) => {
  res.render('auth/login.pug', {
    page: 'Login',
    isLogged: false,
  })
}

const fromRegister = (request, response) => {
  response.render("auth/register.pug", { page: "Creating New Account" });
};

const fromRecovery = (request, response) => {
  response.render("auth/recovery.pug", { page: "Recover Password" });
};


const insertUser = async (request, response) => {
  console.log("El usuario está intentando registrar sus datos en la base de datos");
  await check("name").notEmpty().withMessage("Name field is required").run(request);
  await check("email").notEmpty().withMessage("Email field is required").isEmail().withMessage("The value must be in the format user@domain.ext").run(request);
  await check('password').notEmpty().withMessage("Password field is required").isLength({ min: 8 }).withMessage('Password must contain at least 8 characters').isLength({ max: 20 }).withMessage('Password must contain less than 20 characters').equals(request.body.repeatPassword).withMessage('Both passwords must be the same').run(request);

  let resultValidation = validationResult(request);

  if (resultValidation.isEmpty()) {
    const { name, email, password } = request.body;
    const token = generatedID();

    console.log(`Attempting to insert user ${name}, with email: ${email}, password: ${password}, and token: ${token}`);

    const userExist = await User.findOne({ where: { email: email } });
    console.log(userExist);
    if (userExist && email) {
      return response.render("/register.pug", {
        page: `Creating New Account`,
        errors: [{ msg: `The User with: ${email} already exists` }],

        user: {
          name: request.body.name,
          email: request.body.email
        }
      });
    }
    const newUser = await User.create({
      name,
      email,
      password,
      token
    });

    //Sending configuration email
    emailRegister({
      name,
      email,
      token
    });

    response.render('templates/message.pug', { page: "User Created Successfully", message: `We have sent you an email to: ${email}, please verify your account`, type: "info" });
  } else {
    return response.render("auth/register.pug", {
      page: `Creating New Account`,
      errors: resultValidation.array(),
      user: {
        name: request.body.name,
        email: request.body.email
      }
    });
  }
};

const confirmAccount = async (request, response, next) => {
    // Get token of URL (request)
    const { token } = request.params;
    // Verify if token already exists
    let userToken = await User.findOne({ where: { token } });
    //  Paginas de respuesta
    if (!userToken) {
      console.log(`This token is invalid `);
      response.render('templates/message.pug', {
        page: "Error in Validation Process",
        notificationTitle: "The token is invalid ",
        notificationMessage: "The token is invalid ",
        type: "warning"
      })
    } else {
      console.log(`This token is valid`);
      userToken.verified = true;
      userToken.token = null;
      userToken.save();
  
      response.render('templates/message.pug', {
        page: "Validation Complete",
        notificationTitle: "Your account has been confirmed",
        notificationMessage: "Your account has been confirmed",
        type: "Info"
      })
    }
  }

  const resetPassword = async (request, response) => {
    // Validar que el correo no esté vacío
    await check('email').notEmpty().withMessage('Email field is required').isEmail().withMessage('The Email field should be an Email (user@domain.ext) and not empty').run(request);
    console.log("validacion de errores");
    let result = validationResult(request);

    // Validar la existencia del usuario a través del Email
    const { email } = request.body;
    const userExists = await User.findOne({ where: { email } });
    // Validar que result no tenga errores
    if (result.isEmpty()) {
        // Validar que el correo exista
        if (!userExists) {
            // Página de error
            console.log(`El usuario con correo ${email}`);
            response.render('templates/message.pug', {
                page: "Recovery Password",
                notificationTitle: `Error Email not Found`,
                notificationMessage: "The token is invalid ",
                type: "Error"
            });
        } else {
            // Crear el token para cambiar la contraseña
            const tokenPassword = generateID();
            userExists.token = tokenPassword;
            userExists.save();

            // Enviar correo de acceso al cambio de contraseña
            emailResetPassword({
                email,
                tokenPassword
            });
            console.log(`El usuario con correo ${email} cambiara su contraseña`);
            response.render('templates/message.pug', {
                page: "Recovery Password",
                notificationTitle: `Email Found`,
                notificationMessage: "The token is invalid ",
                type: "Info"
            });
        }
    } else {
        return response.render("auth/recovery.pug", {
            page: `Recovery Password`,
            errors: result.array(),
            //! Sending params to pug
            user: {
                email: request.body.email
            }
        });
    }
};

//change Password
const changePassword = async (req, res) => {
    const { tokenPassword } = req.params;
  
    // Verify if token already exists
    let userToken = await User.findOne({ where: { token: tokenPassword } });
    //  Paginas de respuesta
    if (!userToken) {
      console.log(`This token is invalid `);
      res.render('templates/message.pug', {
        page: "Error in Validation Process",
        notificationTitle: "The token is invalid ",
        notificationMessage: "The token is invalid ",
        type: "warning"
      })
    } else {
      res.render("auth/passwordChange.pug", {
        page: `Change Password`,
        tokenPassword: tokenPassword
      });
    }
  }

  //update Password
  const updatePassword = async (req, res) => {
    const { tokenPassword } = req.params;
    const { newPassword } = req.body;
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
  
    // Verify if token already exists
    let userToken = await User.findOne({ where: { token: tokenPassword } });
    if (!userToken) {
      console.log(`This token is invalid `);
      res.render('templates/message.pug', {
        page: "Error in Validation Process",
        notificationTitle: "The token is invalid ",
        notificationMessage: "The token is invalid ",
        type: "Warning"
      })
    } else {
      console.log(`Intentando actualizar la contraseña en la bd`);
      userToken.token = null;
      userToken.password = hashedPassword;
      userToken.save();
      res.render('templates/message.pug', {
        page: "Error in Validation Process",
        notificationTitle: "Change Password Success ",
        notificationMessage: "The token is invalid ",
        type: "Info"
      })
    }
  
  }

// Authenticate User
const authenticateUser = async (req, res) => {
  // Validar los datos del formulario
  await check('email').notEmpty().withMessage('Email field is required').isEmail().withMessage('The Email field should be an Email (user@domain.ext) and not empty').run(req);
  await check('password').notEmpty().withMessage('Password field is required').isLength({
    min: 8,
    max: 20
  }).withMessage('The password is formed between 8 and 20 characters.').run(req);

  // Desestructurar los datos del body (formulario)
  const { email, password } = req.body;

  let result = validationResult(req);

  console.log(`El usuario: ${email} está intentando autenticarse.`);

  if (result.isEmpty()) {
    // Validar que exista el correo electrónico
    const userExists = await User.findOne({ where: { email } });

    // Validar que el correo exista
    if (!userExists) {
      // Página de error
      return res.render('templates/message.pug', {
        page: "Error in Login",
        notificationTitle: `Error Email not Found`,
        notificationMessage: `The user with email: ${email} does not exist.`,
        type: "Error"
      });
    }

    // Verificar si la contraseña es correcta
    if (!userExists.verifyPassword(password)) {
      // Página de error
      return res.render('templates/message.pug', {
        page: "Error in Login",
        notificationTitle: `Error Password Incorrect`,
        notificationMessage: `The password for the user with email: ${email} is incorrect.`,
        type: "Error"
      });
    }

    // Verificar si es un usuario nuevo
    const isNewUser = !userExists.ultimo_login;

    const lastLoginDate = userExists.ultimo_login;

    const currentDate = new Date();

    console.log(lastLoginDate);
    const timeDifference = Math.abs(currentDate - lastLoginDate);
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    const userName = userExists.name;

    let welcomeMessage = '';

    if (isNewUser) {
      welcomeMessage = `¡Welcome New User!😄`;
    } else if (daysDifference > 30) {
      welcomeMessage = `Welcome Back ${userName}! It's been more than ${daysDifference} days since your last login😭`;
    } else if (daysDifference > 7) {
      welcomeMessage = `Welcome Back ${userName}! It's been more than ${daysDifference} days since your last login😔`;
    } else {
      welcomeMessage = `Welcome Back ${userName}👋! What a joy to have you back!`;
    }

    // Actualizamos la columna
    userExists.ultimo_login = currentDate;
    await userExists.save();

    // Generar el Token de Acceso (JWT), almacenar en cookie, redireccionar, etc.
    const token = jwtToken(userExists.id); // Ajusta esto según cómo generas tus tokens
    console.log(`JWT generado es: ${token}`);
    
    // TODO: Almacenar el JWT en una cookie
    res.cookie('_token', token, {
      httpOnly: true,
      // secure: true, // opción para configurar el protocolo https
    });

    // Renderizar home.pug con el mensaje de bienvenida
    return res.render('user/home.pug', { page: 'My Properties', showHeader: true, user: { name: 'muriii' }, welcomeMessage });

  } else {
    // Manejar errores de validación
    return res.render("auth/login.pug", {
      page: `Login`,
      errors: result.array(),
      user: {
        email: req.body.email
      }
    });
  }
};




const homePage = (req,res) => {
    res.render('user/home.pug',{
      page: 'My Properties',
      showHeader: true,
      user: {
        name: 'muriii'
      }
    })
}

export { formLogin, fromRegister, fromRecovery, insertUser, confirmAccount, resetPassword, authenticateUser, changePassword, updatePassword, homePage };

 // response.send("userCreated");
                //No tienes que salirte de la carpeta, por defecto cuando le pones un "render", va a buscar en la carpeta views, así que sol le das la ruta dentro de views     
                //response.render("auth/user-created.pug", {page:"Successfull record"});
