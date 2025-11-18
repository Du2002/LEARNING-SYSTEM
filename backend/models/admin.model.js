const mongoose = require("mongoose") 
const { Schema } = mongoose;
 

const adminSchema = new Schema({
 
    username:{
      type:String,
      required:true,
      unique:true,
      trim:true
    },
     
    email:{
        type:String,
        required:true,
    },
},
    {
        timestamps:{createdAt: true, updatedAt: false}
    }
)
 const adminModel = mongoose.model('Admin', adminSchema);

 module.exports = adminModel