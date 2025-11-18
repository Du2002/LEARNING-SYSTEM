const {Router} = require("express")
const { Login, Register } = require("../controller/admin.controller")
// const { authenticateStudent } = require("../middleware/student.middleware")
 

const adminRouter = Router()
 
adminRouter.post("/login",Login)
adminRouter.post("/dashboard",Register)
// studentRouter.get("/profile",authenticateStudent,Profile)
 

module.exports = adminRouter