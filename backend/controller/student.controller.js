const studentModel = require("../models/student.model")
const bcrypt = require("bcrypt")

//login 
async function Login(req,res){
    try {
        const {username,password}=req.body

        const user = await studentModel.findOne({username: username})
    } catch (error) {
        if(!user){
            return res.status(404).json({msg:"username not found"})
        }else{
            const valid = await bcrypt.compare(password,user.password)
            if (valid){
                //TODO: PUT TOKEN
                return res.json ({msg:"Login Succes"})
            }else{
                return res.status(401).json({msg:"Authentication failed"})
            }
           return res.status(500).json({msg:"Server Error"}) 
        }
        
    }

    
}

module.exports = {
    Login,
}