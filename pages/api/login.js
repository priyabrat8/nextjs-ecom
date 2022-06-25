import connectDB from "../../middleware/mongoose";
import User from "../../models/User";

var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


const handler = async (req, res) => {
  if (req.method == "POST") {
       let  user = await User.findOne({email: (req.body.email).toLowerCase()})

       if (user) {
           if ((req.body.email).toLowerCase() == user.email && req.body.password == CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8)) {
            var token = jwt.sign({ msg: "User Find.", email: user.email , name: user.name}, process.env.SECRET_JWT_KEY,{expiresIn: "2d"});
            res.status(200).json({ type: true,token,email: user.email});
           }

           else {
            res.status(200).json({ msg: "Email or Password is invalid.", type : false});
           }
       }

       else if (!user) {
        res.status(200).json({ msg: "User does not exist.", type: false });
       }

      } 


};

export default connectDB(handler);
