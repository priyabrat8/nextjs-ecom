import User from '../../models/User'
import connectDB from '../../middleware/mongoose'
import jsonwebtoken from 'jsonwebtoken'

const handler = async (req,res) => {
    if (req.method == 'POST') {
        let token = req.body.token
        let user = jsonwebtoken.verify(token,process.env.SECRET_JWT_KEY)
        let userdata = await User.findOne({email: user.email})
        const {name,email,address,state,pincode,city,phone} = userdata 
        res.status(200).json({ name,email,address,state,pincode,city,phone })        
    }
    else {
        res.status(200).json({ error: true })
    }

}

export default connectDB(handler)
    
