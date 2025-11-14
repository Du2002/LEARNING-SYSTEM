const {Router} = require("express")
const { Login, Register } = require("../controller/student.controller")
 

const studentRouter = Router()
 
studentRouter.get("/login",Login)
studentRouter.get("/register",Register)

 

module.exports = studentRouter