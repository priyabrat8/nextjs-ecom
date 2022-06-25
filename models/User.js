const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {type: String, required : true},
    email: {type: String, required : true, unique: true},
    password: {type: String, required : true},
    phone :  {type: Number, required : true},
    address: {type: String, default: ''},
    city: {type: String, default: ''},
    state: {type: String, default: ''},
    pincode: {type: String, default: ''}

  }, {timestamps: true});

  export default  mongoose.models.User || mongoose.model("User",UserSchema)