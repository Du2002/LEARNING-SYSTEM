const courseModel = require("../models/courses.model")

// Get all courses
async function GetAllCourses(req, res) {
    try {
        const courses = await courseModel.find()
        res.json({ courses })
    } catch (error) {
        return res.status(500).json({ msg: "Error fetching courses" })
    }
}

// Get single course
async function GetCourse(req, res) {
    try {
        const { id } = req.params
        const course = await courseModel.findById(id)
        
        if (!course) {
            return res.status(404).json({ msg: "Course not found" })
        }
        
        res.json({ course })
    } catch (error) {
        return res.status(500).json({ msg: "Error fetching course" })
    }
}

// Create new course
async function CreateCourse(req, res) {
    try {
        const { title, subtitle, description, courseName, modules } = req.body
        
        const course = await courseModel.create({
            title,
            subtitle,
            description,
            courseName,
            modules: modules || []
        })
        
        res.status(201).json({ msg: "Course created successfully", course })
    } catch (error) {
        return res.status(500).json({ msg: "Error creating course" })
    }
}

// Update course
async function UpdateCourse(req, res) {
    try {
        const { id } = req.params
        const { title, subtitle, description, courseName, modules } = req.body
        
        const course = await courseModel.findByIdAndUpdate(
            id,
            { title, subtitle, description, courseName, modules },
            { new: true }
        )
        
        if (!course) {
            return res.status(404).json({ msg: "Course not found" })
        }
        
        res.json({ msg: "Course updated successfully", course })
    } catch (error) {
        return res.status(500).json({ msg: "Error updating course" })
    }
}

// Delete course
async function DeleteCourse(req, res) {
    try {
        const { id } = req.params
        
        const course = await courseModel.findByIdAndDelete(id)
        
        if (!course) {
            return res.status(404).json({ msg: "Course not found" })
        }
        
        res.json({ msg: "Course deleted successfully" })
    } catch (error) {
        return res.status(500).json({ msg: "Error deleting course" })
    }
}

module.exports = {
    GetAllCourses,
    GetCourse,
    CreateCourse,
    UpdateCourse,
    DeleteCourse,
}