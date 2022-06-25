import connectDB from "../../middleware/mongoose";
import Order from "../../models/Order";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
    const token = req.body.token
    const data = jsonwebtoken.verify(token,process.env.SECRET_JWT_KEY)
    let orders = await Order.find({email: data.email, status: 'Paid'});

    res.status(200).json({msg: 'products', orders: orders})
};

export default connectDB(handler);
