import BASE_URL from "./baseUrl"

// Upload PDF file
export async function uploadPDF(token, file) {
    try {
        const formData = new FormData();
        formData.append('pdf', file);

        const res = await BASE_URL.post("/upload/pdf", formData, {
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        console.error("Upload error:", error);
        return ({ error: "Error uploading PDF" });
    }
}

// Delete PDF file
export async function deletePDF(token, publicId) {
    try {
        const res = await BASE_URL.delete("/upload/pdf", {
            headers: {
                Authorization: "Bearer " + token
            },
            data: { publicId }
        });
        return res.data;
    } catch (error) {
        console.error("Delete error:", error);
        return ({ error: "Error deleting PDF" });
    }
}