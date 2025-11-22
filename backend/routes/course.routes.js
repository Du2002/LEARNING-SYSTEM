const { Router } = require("express")
const { GetAllCourses, GetCourseByName} = require("../controller/course.controller")
const { authenticateStudent } = require("../middleware/student.middleware")

const courseRouter = Router()

// Public course routes (require student authentication)
courseRouter.get("/all", authenticateStudent, GetAllCourses)
courseRouter.get("/:courseName", authenticateStudent, GetCourseByName)

module.exports = courseRouter