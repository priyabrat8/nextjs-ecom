import connectDB from "../../middleware/mongoose";
import Order from "../../models/Order";
import Product from "../../models/Product"
import pincodes from '../../pincodes.json'

const handler = async (req, res) => {
  if (req.method == "POST") {
      
    let product,subTotal=0;

    // Check if the pincode is servicable
    if (!Object.keys(pincodes).includes(req.body.pincode)) {
      res.status(200).json({scusses: false ,"error": "The pincode you have entered is not servicable",clear:false})
      return
    }
    // Check if custmor cheating with changing cart 
    if (req.body.total <= 0) {
      res.status(200).json({scusses: false ,"error": "Cart empty! Build you cart and try again",clear:true})
      return
    }
    for (const item in req.body.cart) {
    product = await Product.findOne({slug: item})
    subTotal += req.body.cart[item].price * req.body.cart[item].qty

    // Check if product is out of stock
     if (product.availabeQty < req.body.cart[item].qty) {
      res.status(200).json({scusses: false ,"error": "Some items in your cart went out of stock. Please try again",clear:true})
      return
     }

     else if (product.price != req.body.cart[item].price) {
      console.log(product.price,req.body.cart[item].price);
       res.status(200).json({scusses: false ,"error": "The price of some itmes in your cart has changed. Please try again",clear:true})
       return
     }
    }

    
    if (subTotal !== req.body.total) {
      console.log(subTotal, req.body.total);
      res.status(200).json({scusses: false , "error": "The price of some itmes in your cart has changed. Please try again",clear:true})
      return
     }

    //  Validate data
    if (((req.body.phone).toString()).length !== 10 || !parseInt(req.body.phone)) {
      res.status(200).json({scusses: false , error: "Please enter your 10 digit phone number",clear:false})
      return
    }
    if (((req.body.pincode).toString()).length !== 6 || !parseInt(req.body.pincode)) {
      res.status(200).json({scusses: false , error : "Please enter your 6 digit pincode", clear:false  })
      return
    }    
    
      let order = new Order({
        name: req.body.name,
        email: req.body.email,
        orderId: req.body.orderId,
        address:req.body.address,
        city:req.body.city,
        state:req.body.state,
        pincode:req.body.pincode,
        amount: req.body.total,
        products: req.body.cart,
        phone: req.body.phone
      });
      let newOrder = await order.save();
      let products = newOrder.products

      for (const slug in products) {
        await Product.findOneAndUpdate({slug:slug}, { $inc : { "availabeQty" : - products[slug].qty}} )
      }

      
      res.status(200).json({scusses: true, msg: "You order placced scussesfully. Check in Orders Page"})
   
    
    

    
  }
};

export default connectDB(handler);