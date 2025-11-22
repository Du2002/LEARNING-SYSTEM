const studentModel = require("../models/student.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
                //jwt create
                const token = jwt.sign({_id:user._id,role:"student"},
                    "12345"
                )
                return res.json ({token})
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

//profile
async function Profile(req,res){
    try {
        const ID = req.user
        const user = await studentModel.findById(ID)
    
        if(!user){
            return res.status(404).json({msg:"User not found"})
        }else{
            const {password,...rest} = user._doc
            res.json({rest})
        }
    
        } catch (error) {
        
            return res.status(500).json({msg:"Error Occured"})
        }  
    }

//NEW: Update profile
async function UpdateProfile(req,res){
    try {
        const ID = req.user
        const {username, fullname, email, password, profilePicture} = req.body

        // Find user
        const user = await studentModel.findById(ID)
        if(!user){
            return res.status(404).json({msg:"User not found"})
        }

        // Check if username or email already exists (excluding current user)
        if(username && username !== user.username){
            const existingUsername = await studentModel.findOne({username: username, _id: {$ne: ID}})
            if(existingUsername){
                return res.status(400).json({msg:"Username already taken"})
            }
        }

        if(email && email !== user.email){
            const existingEmail = await studentModel.findOne({email: email, _id: {$ne: ID}})
            if(existingEmail){
                return res.status(400).json({msg:"Email already taken"})
            }
        }

        // Prepare update data
        const updateData = {}
        if(username) updateData.username = username
        if(fullname) updateData.fullname = fullname
        if(email) updateData.email = email
        if(profilePicture !== undefined) updateData.profilePicture = profilePicture

        // Update password if provided
        if(password && password.trim() !== ""){
            const hashPassword = await bcrypt.hash(password, 10)
            updateData.password = hashPassword
        }

        // Update user
        const updatedUser = await studentModel.findByIdAndUpdate(
            ID, 
            updateData, 
            {new: true}
        )

        // Return updated user without password
        const {password: pwd, ...rest} = updatedUser._doc
        res.json({msg:"Profile updated successfully", rest})

    } catch (error) {
        console.error("Update profile error:", error)
        return res.status(500).json({msg:"Error Occured"})
    }  
}

// Get all students (for admin)
async function GetAllStudents(req, res) {
    try {
        const students = await studentModel.find().select('-password')
        res.json({ students })
    } catch (error) {
        return res.status(500).json({ msg: "Error fetching students" })
    }
}

module.exports = {
    Login,
    Register,
    Profile,
    UpdateProfile,
    GetAllStudents,
}