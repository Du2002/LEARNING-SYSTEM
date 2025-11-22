const mongoose = require("mongoose") 
const { Schema } = mongoose;
 

const moduleSchema = new Schema({
 
    title:{
      type:String,
      required:true,  
    },
     
    description:{
        type:String,
        required:true,
    },
})


const courseSchema = new Schema({
 
    title:{type:String,required:true},
    subtitle:{type:String,required:true},
    description:{type:String,required:true},
    modules:{type:[moduleSchema],required:false}
},
 {timestamps:true}
    
)
 const courseModel = mongoose.model('Course',courseSchema);

 module.exports = courseModel