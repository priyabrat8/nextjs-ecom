import User from '../../models/User'
import connectDB from '../../middleware/mongoose'
import jsonwebtoken from 'jsonwebtoken'

const handler = async (req,res) => {
    if (req.method == 'POST') {
        let token = req.body.token
        let user = jsonwebtoken.verify(token,process.env.SECRET_JWT_KEY)
        let userdata = await User.findOneAndUpdate({email: user.email},{address: req.body.address,city: req.body.city,state: req.body.state,pincode: req.body.pincode,phone:req.body.phone,name:req.body.name})
        res.status(200).json({ success: true })        
    }
    else {
        res.status(200).json({ success: false })
    }

}

export default connectDB(handler)