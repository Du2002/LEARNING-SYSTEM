const mongoose = require("mongoose") 
const { Schema } = mongoose;

const studentSchema = new Schema(
  {
    username:{
      type:String,
      required:true,
      unique:true,
      trim:true,//cannot have space before it satart
    },
    fullname:{
      type:String,
      required:true,
      trim:true,
    },
    password:{
      type:String,
      required:true,
    },
    email: {
      type:String,
      required:true,
    },
 },
 {timestamps:true}
)
 const studentModel = mongoose.model('Student', studentSchema);

 module.exports = studentModel