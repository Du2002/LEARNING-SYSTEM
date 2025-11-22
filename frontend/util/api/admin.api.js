import BASE_URL from "./baseUrl"

// ============ Admin Authentication ============
export async function adminLogin(email, password) {
    try {
        const res = await BASE_URL.post("/admin/login", { email, password });
        return res.data;
    } catch (error) {
        return ({ error: "Login error" });
    }
}

export async function adminRegister(username, email, password) {
    try {
        const res = await BASE_URL.post("/admin/register", { username, email, password });
        return res.data;
    } catch (error) {
        return ({ error: "Registration error" });
    }
}

// ============ Admin Management ============
export async function getAllAdmins(token) {
    try {
        const res = await BASE_URL.get("/admin/admins", {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        return res.data;
    } catch (error) {
        return ({ error: "Error fetching admins" });
    }
}

export async function deleteAdmin(token, adminId) {
    try {
        const res = await BASE_URL.delete(`/admin/admins/${adminId}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        return res.data;
    } catch (error) {
        return ({ error: "Error deleting admin" });
    }
}

// ============ Course Management ============
export async function getAllCourses(token) {
    try {
        const res = await BASE_URL.get("/admin/courses", {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        return res.data;
    } catch (error) {
        return ({ error: "Error fetching courses" });
    }
}

export async function getCourse(token, courseId) {
    try {
        const res = await BASE_URL.get(`/admin/courses/${courseId}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        return res.data;
    } catch (error) {
        return ({ error: "Error fetching course" });
    }
}

export async function createCourse(token, courseData) {
    try {
        const res = await BASE_URL.post("/admin/courses", courseData, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        return res.data;
    } catch (error) {
        return ({ error: "Error creating course" });
    }
}

export async function updateCourse(token, courseId, courseData) {
    try {
        const res = await BASE_URL.put(`/admin/courses/${courseId}`, courseData, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        return res.data;
    } catch (error) {
        return ({ error: "Error updating course" });
    }
}

export async function deleteCourse(token, courseId) {
    try {
        const res = await BASE_URL.delete(`/admin/courses/${courseId}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        return res.data;
    } catch (error) {
        return ({ error: "Error deleting course" });
    }
}

// ============ Student Management ============
export async function getAllStudents(token) {
    try {
        const res = await BASE_URL.get("/admin/students", {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        return res.data;
    } catch (error) {
        return ({ error: "Error fetching students" });
    }
}