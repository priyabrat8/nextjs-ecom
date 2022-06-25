import connectDB from '../../middleware/mongoose'
import Order from '../../models/Order'


const handler = async (req,res) => {
    if (req.method == 'POST') {
       const user = await Order.find({email:req.body.email})

    if (user) {
        for (const orders of user) {
                if (Object.keys(orders.products).includes(String(req.body.name))) {
                    res.status(200).json({success: true, msg: 'You can give review'}) 
                    return
                }
                else {
                    res.status(200).json({success: false, msg: 'You have not buy the product yet!'})     
                    return
            
                }
            
        }
    }

    else {
        res.status(200).json({success: false, msg: 'You have not buy the product yet!'})     
        return

    }
          
    }

}

export default connectDB(handler)
    
