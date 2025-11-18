import BASE_URL from "./baseUrl"

export async function adminLogin(username,email) {
    try {
        const res = await BASE_URL.post("/admin/login", {username,email });
        return res.data;
    } catch (error) {
        return ({ error: "Error" });
    }
}


export async function adminRegister(username,email) {
    try {
        const res = await BASE_URL.post("/admin/dashboard", {username,email});
        return res.data;
    } catch (error) {
        return ({ error: "Error" });
}
}

export async function deleteAdmin(adminId) {
    try {
        const res = await BASE_URL.delete(`/admin/${adminId}`);
        return res.data;
    } catch (error) {
        return ({ error: "Error" });
    }
}