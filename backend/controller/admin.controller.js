const adminModel = require("../models/admin.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

//login 
async function Login(req, res) {
    try {
        const { email, password } = req.body

        const user = await adminModel.findOne({ email: email })
    
        if (!user) {
            return res.status(404).json({ msg: "Admin not found" })
        } else {
            const valid = await bcrypt.compare(password, user.password)
            if (valid) {
                //jwt create
                const token = jwt.sign(
                    { _id: user._id, role: "admin" },
                    "12345"
                )
                return res.json({ token })
            } else {
                return res.status(401).json({ msg: "Authentication failed" })
            } 
        }
    } catch (error) {
        return res.status(500).json({ msg: "Error Occured" })
    }  
}

// Register new admin
async function Register(req, res) {
    try {
        const { username, email, password } = req.body
        const hashPassword = await bcrypt.hash(password, 10)

        const user = await adminModel.create({
            username,
            email,
            password: hashPassword,
        })
        
        res.json({ msg: "Admin created" })
    
    } catch (error) {
        return res.status(500).json({ msg: "Error Occured" })
    }  
}

// Get all admins
async function GetAllAdmins(req, res) {
    try {
        const admins = await adminModel.find().select('-password')
        res.json({ admins })
    } catch (error) {
        return res.status(500).json({ msg: "Error Occured" })
    }
}

// Delete admin
async function DeleteAdmin(req, res) {
    try {
        const { id } = req.params
        
        await adminModel.findByIdAndDelete(id)
        res.json({ msg: "Admin deleted successfully" })
        
    } catch (error) {
        return res.status(500).json({ msg: "Error Occured" })
    }
}

module.exports = {
    Login,
    Register,
    GetAllAdmins,
    DeleteAdmin,
}