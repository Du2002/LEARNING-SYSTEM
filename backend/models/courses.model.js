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
     // NEW: PDF file information
    pdfUrl: {
        type: String,
        default: "" // Cloudinary URL of the PDF
    },
    downloadUrl: {
        type: String,
        default: "",
    },
    pdfPublicId: {
        type: String,
        default: "" // Cloudinary public ID (for deletion)
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