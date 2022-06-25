const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    name: {type: String, required : true},
    rating :  {type: Number,  default: 0},
    numrating :  {type: Number,  default:0},
    comments: {type:Array , required:true,default: []}
  }, {timestamps: true});

  export default  mongoose.models.Review || mongoose.model("Review",ReviewSchema)