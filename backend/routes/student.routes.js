const {Router} = require("express")
const { Login, Register,Profile } = require("../controller/student.controller")
const { authenticateStudent } = require("../middleware/student.middleware")
 

const studentRouter = Router()
 
studentRouter.post("/login",Login)
studentRouter.post("/register",Register)
studentRouter.get("/profile",authenticateStudent,Profile)
 

module.exports = studentRouter