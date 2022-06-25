const mongoose = require('mongoose');

const ForgotUserSchema = new mongoose.Schema({
    email: {type: String, required : true, unique: true},
    token: {type: String, required : true}
    
  }, {timestamps: true});

  export default  mongoose.models.ForgotUser || mongoose.model("ForgotUser",ForgotUserSchema)