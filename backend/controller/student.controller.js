const studentModel = require("../models/student.model")
const bcrypt = require("bcrypt")

//login 
async function Login(req,res){
    try {
        const {email,password}=req.body

        const user = await studentModel.findOne({email: email})
    
        if(!user){
            return res.status(404).json({msg:"User not found"})
        }else{
            const valid = await bcrypt.compare(password,user.password)
            if (valid){
                //TODO: PUT TOKEN
                return res.json ({msg:"Login Succes"})
            }else{
                return res.status(401).json({msg:"Authentication failed"})
            } 
        }
        } catch (error) {
        
            return res.status(500).json({msg:"Error Occured"})
        }  
}

//Register
async function Register(req,res){
    try {
        const {username,fullname,email,password}=req.body
        const hashPassword = await bcrypt.hash(password,10)

        const user = await studentModel.create(
            {
                username,
                fullname,
                email,
                password:hashPassword,
            })
        res.json({msg:"User created"})
    
        } catch (error) {
        
            return res.status(500).json({msg:"Error Occured"})
        }  
    }

module.exports = {
    Login,
    Register,
}