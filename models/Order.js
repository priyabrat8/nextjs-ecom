const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name: {type: String,required:true},
    email: {type: String,required:true},
    orderId: {type: String,required:true},
    paymentInfo: {type: String,default:''},
    transactionId: {type: String,default: ''},
    products:{type: Object, required: true},
    address: {type:String,required:true},
    city: {type: String, required:true},
    state: {type: String, required:true},
    pincode: {type: String, required:true},
    amount: {type:String,required:true},
    phone: {type:String,required:true},
    status: {type:String,default: 'Paid',required:true},
    deliveryStatus: {type:String,default: 'Unshipped',required:true},

  }, {timestamps: true});

export default  mongoose.models.Order || mongoose.model("Order",OrderSchema)