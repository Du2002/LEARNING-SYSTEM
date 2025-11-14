 const {Router} = require("express")
const { Login } = require("../controller/student.controller")
 

const studentRouter = Router()
 
testRouter.get("/test",Login)

module.exports = studentRouter