import BASE_URL from "./baseUrl"

// Get all courses (for students)
export async function getAllCoursesForStudents(token) {
    try {
        const res = await BASE_URL.get("/course/all", {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        return res.data;
    } catch (error) {
        console.error("API Error:", error);
        return ({ error: "Error fetching courses" });
    }
}

// Get single course by title (URL-encoded)
export async function getCourseByName(token, courseName) {
    try {
        // courseName is already URL-encoded from the URL, so we can use it directly
        const res = await BASE_URL.get(`/course/${courseName}`, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        return res.data;
    } catch (error) {
        console.error("API Error:", error);
        return ({ error: "Error fetching course" });
    }
}