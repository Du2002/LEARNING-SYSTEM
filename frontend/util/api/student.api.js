import BASE_URL from "./baseUrl"

export async function studentLogin(email, password) {
    try {
        const res = await BASE_URL.post("/student/login", { email, password });
        return res.data;
    } catch (error) {
        return ({ error: "Error" });
    }
}

export async function studentRegister(username,fullname,email, password) {
    try {
        const res = await BASE_URL.post("/student/register", {username,fullname, email, password });
        return res.data;
    } catch (error) {
        return ({ error: "Error" });
    }
}


export async function studentProfile(token) {
    try {
        const res = await BASE_URL.get("/student/profile", {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        return res.data;
    } catch (error) {
        return ({ error: "Error" });
    }
}

 

