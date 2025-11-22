const {Router} = require("express")
const { Login, Register,Profile,UpdateProfile } = require("../controller/student.controller")
const { authenticateStudent } = require("../middleware/student.middleware")
 

const studentRouter = Router()
 
studentRouter.post("/login",Login)
studentRouter.post("/register",Register)
studentRouter.get("/profile",authenticateStudent,Profile)
studentRouter.put("/profile", authenticateStudent, UpdateProfile) 

module.exports = studentRouter