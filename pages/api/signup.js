import connectDB from "../../middleware/mongoose";
import User from "../../models/User";

var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let email = await User.findOne({email: req.body.email})
    if (email) {
      res.status(200).json({ msg: "Email already exist.", type: false });
    }else if ((req.body.password).toLowerCase() === 'password') {
      res.status(200).json({ msg: "Password can't be 'password'", type: false });
    }else if (req.body.password.length < 8 ) {
      res.status(200).json({ msg: "Passwords must be at least 8 characters.", type: false });
    }
    else if (req.body.phone.length !== 10 || Number.isInteger(req.body.phone)) {
      res.status(200).json({type: false , msg: "Please enter your 10 digit phone number"})
      return
    }
    else if (!email && (req.body.password).toLowerCase() !== 'password' && req.body.password.length >= 8  ) {
      let u = new User({
        name: req.body.name,
        email: (req.body.email).toLowerCase(),
        password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString() ,
        phone: parseInt(req.body.phone)
      })
      await u.save()

    res.status(200).json({ message: "User Added.", type: true });
    }
     
  } 


};

export default connectDB(handler);
