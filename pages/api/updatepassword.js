import User from '../../models/User'
import connectDB from '../../middleware/mongoose'
import jsonwebtoken from 'jsonwebtoken'

var CryptoJS = require("crypto-js");


const handler = async (req,res) => {
    if (req.method == 'POST') {
        let token = req.body.token
        let user = jsonwebtoken.verify(token,process.env.SECRET_JWT_KEY)
        let userdata = await User.findOneAndUpdate({email: user.email},{})
        
        if (req.body.opassword == CryptoJS.AES.decrypt(userdata.password, process.env.AES_SECRET).toString(CryptoJS.enc.Utf8)) {
            if ((req.body.password).toLowerCase() === 'password') {
                res.status(200).json({ msg: "Password can't be 'password'", success: false });
                }else if (req.body.password.length < 8 ) {
                res.status(200).json({ msg: "Passwords must be at least 8 characters.", success: false });
                }
                else if (req.body.password !== req.body.cpassword) {
                    res.status(200).json({ success: false, msg:'Password does not match!' })
                }
                else if (req.body.password == req.body.cpassword) {
                    let userdata = await User.findOneAndUpdate({email: user.email},{password : CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString()})
                    res.status(200).json({ success: true })    
                }    
        }

        else {
            res.status(200).json({ success: false, msg: 'Old Password is wrong!' }) 
        }

        
                
    }
    else {
        res.status(200).json({ success: false, msg:' Unable to Update Password!' })
    }

}

export default connectDB(handler)