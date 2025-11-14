 const mongoose = require("mongoose") 
 
 const enrollSchema = new Schema(
   {
     student:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Student",
       required:true,
        
     },
     course:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"Student",
       required:true,
        
     },
    
  },
  {timestamps:true}
 )
  const enrollModel = mongoose.model('User', enrollSchema);
 
  module.exports = enrollModel