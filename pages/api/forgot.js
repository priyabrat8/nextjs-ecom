import ForgotUser from '../../models/ForgotUser'
import connectDB from "../../middleware/mongoose";
import User from "../../models/User";

var SIB = require('sib-api-v3-sdk');


const handler = async (req, res) => {
  if (req.method == "POST") {

    // Send Mail
if (req.body.sendMail) {

    // Find User
    let user = await User.findOne({email: req.body.email})
    if (user){
    let token = Math.floor(Math.random() * Date.now())

    let text = `
    <div>
    We have sent you this email in response to your request to reset your password on Proshop.com

    To reset your password  please follow the link below:

    <a href="${process.env.NEXT_PUBLIC_HOST}/forgot?token=${token}">Click here to reset your password</a>

    <br/><br/>

    We recommend that you keep your password secure and not share it with anyone.If you feel your password has been compromised, you can change it by going to your  My Account Page and Change your password.

    <br/><br/>
    </div>
    `

    const clint = SIB.ApiClient.instance
    const apiKey = clint.authentications['api-key']
    apiKey.apiKey = process.env.SENDINBLUE_KEY

    const tranEmailApi =  new SIB.TransactionalEmailsApi()

    const sender = {email: process.env.SENDER_EMAIL, name: 'Proshop'}

    const reciver = [{email: req.body.email},]

    let e = await tranEmailApi.sendTransacEmail({
      sender ,
      to: reciver,
      subject: 'Reset Password' , 
      htmlContent: text
    })

    let forgot = new ForgotUser({
        email: req.body.email,
        token,
    }) 

    await forgot.save()
    
  res.status(200).json({scusses:true, msg: "Email Successfully Sended"})
  } 
  else {
    res.status(200).json({scusses:false, error: "Email does not exist!"}) 
}

    
  }
}
}



export default connectDB(handler);

  