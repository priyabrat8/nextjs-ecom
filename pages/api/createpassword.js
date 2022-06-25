import ForgotUser from '../../models/ForgotUser'
import User from '../../models/User'
import connectDB from '../../middleware/mongoose'

var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {

if (req.body.Vtoken) {

    let user = await ForgotUser.findOne({token: req.body.token})
    if (user){
        res.status(200).json({scusses:true, istoken:true}) 
    }
    else {
        res.status(200).json({scusses:false, istoken:false}) 
    }
  }

  else {
    let user = await ForgotUser.findOne({token:req.body.token})
    if ((req.body.npassword).toLowerCase() === 'password') {
      res.status(200).json({ error: "Password can't be 'password'", scusses: false });
      }else if (req.body.npassword.length < 8 ) {
      res.status(200).json({ error: "Passwords must be at least 8 characters.", scusses: false });
      }
      else if (req.body.npassword !== req.body.cpassword) {
          res.status(200).json({ scusses: false, error:'Password does not match!' })
      }
      else if (req.body.npassword == req.body.cpassword) {
          let userdata = await User.findOneAndUpdate({email: user.email},{password : CryptoJS.AES.encrypt(req.body.npassword, process.env.AES_SECRET).toString()})
          let delforgotuser = await ForgotUser.deleteOne({email: userdata.email})
          res.status(200).json({ scusses: true, msg: 'Password Successfully Updated' })    
      } 
  }
}
}



export default connectDB(handler);

  