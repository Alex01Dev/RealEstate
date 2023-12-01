import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config({path:"src/.env"})

var transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth:{
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
  }
})
const emailRegister = async (userData)=>{
   
    const {name, email, token} = userData;
    await transport.sendMail(
        {
            from: "220419@utxicotepec.edu.mx",
            to:email,
            subject: "Welcome to RealState-220419- Confirm your account",
            text: `Thank you for chosing us ${name}, in our plaform, you could sell and buy properties to continue please follow confirmation link below: `,
            html: 
             `
         <div style="background-color: #C0D6DF; font-family: sans-serif; color: #333;">
           <table cellspacing="0" cellpadding="0" border="0" width="100%">
             <tr style="margin-top: 25px;">
                 <td width="20%" style="background-color: #DD6E42; padding: 10px; text-align: center; margin-top: 25px;">
                     <p style="font-family: Arial, sans-serif; font-size: 18px; color: #666;">RealState.com</p>
                 </td>
                 <td style:"margin-top: 25px;">
               </td>
             </tr>
             <tr style="text-align: center; margin-top: 25px;">
               <td colspan="2" style="padding: 20px; margin-top: 25px;">
                 <p style="font-family: Arial, sans-serif; color: #333; font-size: 16px; margin-bottom: 10px;">Hello ${name}, you are verifying your account on RealState.com.</p>
                <p>Your account is almost active. Please follow the activation link below: <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/confirm/${token}"> Click here to Activate Your Account</a></p> 
               </td>
              
             </tr>
           </table>
         </div>
         `

        }
    )

    console.log(`
        Mailtrap-Se está intentando enviar un correo electrónico al usuario: ${userData.email}, con el token de validación ${userData.token}
    `)
}
const emailResetPassword = async (userData)=>{
   
    const {name, email, tokenPassword} = userData;
    await transport.sendMail(
        {
            from: "220419@utxicotepec.edu.mx",
            to:email,
            subject: "RealState - 220419 - Reset your password",
            text: `You have received your password change request, please follow the link below `,
            html: `
        <div style="background-color: #C0D6DF; font-family: sans-serif; color: #333;">
          <table cellspacing="0" cellpadding="0" border="0" width="100%">
            <div style="background-color: #DD6E42">
                <p style="font-family: Arial, sans-serif; font-size: 18px; color: #FFFFF;">RealState.com</p>
              </div>
            <tr style="text-align: center; margin-top: 25px;">
              <td colspan="2" style="padding: 20px; margin-top: 25px;">
                <p style="font-family: Arial, sans-serif; color: #333; font-size: 16px; margin-bottom: 10px;">Hello ${name}, we received a request to change you password</p>
                <p style="font-family: Arial, sans-serif; color: #333; font-size: 16px; margin-bottom: 10px;">Please flolow the reset password link below</p>
                <a href="http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/login/passwordChange/${tokenPassword}">Click here to change your password</a>
                <p style="font-family: Arial, sans-serif; color: #333; font-size: 16px; margin-bottom: 10px;">If you didn´t request a password  recovery just ignore this emil</p>
              </td>
            </tr>
          </table>
        </div>
        `
        }
    )
    console.log(`
        Mailtrap-Se está intentando enviar un correo a ${email} de ${name}
    `)
}

export {emailRegister,emailResetPassword}