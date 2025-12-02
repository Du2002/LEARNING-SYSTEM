require("dotenv").config()
require("./database/connect")
const express = require("express")
const cors = require("cors")

const testRouter = require("./routes/test.routes") 
const studentRouter = require("./routes/student.routes")
const adminRouter = require("./routes/admin.routes")
const courseRouter = require("./routes/course.routes")
const uploadRouter = require("./routes/upload.routes")

 
const app = express()

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))

app.use(cors({
  origin: [
    'https://lms-frontend-indol-five.vercel.app',  // Your Vercel URL
    'http://localhost:3000'              // For local development
  ],
  credentials: true
}))

app.use("/test",testRouter)
app.use("/student", studentRouter)
app.use("/admin", adminRouter)
app.use("/course", courseRouter)
app.use("/upload", uploadRouter)


app.listen(5000,()=> console.log("server running at port 5000"))