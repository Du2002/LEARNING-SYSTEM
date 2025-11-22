const { Router } = require("express")
const { Login, Register, GetAllAdmins, DeleteAdmin } = require("../controller/admin.controller")
const { GetAllCourses, GetCourse, CreateCourse, UpdateCourse, DeleteCourse } = require("../controller/course.controller")
const { authenticateAdmin } = require("../middleware/admin.middleware")
const { GetAllStudents } = require("../controller/student.controller")

const adminRouter = Router()

// Admin authentication routes
adminRouter.post("/login", Login)
adminRouter.post("/register", Register)
adminRouter.get("/students", authenticateAdmin, GetAllStudents)

// Admin management routes (protected)
adminRouter.get("/admins", authenticateAdmin, GetAllAdmins)
adminRouter.delete("/admins/:id", authenticateAdmin, DeleteAdmin)

// Course management routes (protected)
adminRouter.get("/courses", authenticateAdmin, GetAllCourses)
adminRouter.get("/courses/:id", authenticateAdmin, GetCourse)
adminRouter.post("/courses", authenticateAdmin, CreateCourse)
adminRouter.put("/courses/:id", authenticateAdmin, UpdateCourse)
adminRouter.delete("/courses/:id", authenticateAdmin, DeleteCourse)

module.exports = adminRouter