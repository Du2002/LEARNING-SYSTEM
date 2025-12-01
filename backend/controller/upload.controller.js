const cloudinary = require('../config/cloudinary');

// Upload PDF to Cloudinary
async function UploadPDF(req, res) {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ msg: "No file uploaded" });
        }

        // Check if it's a PDF
        if (req.file.mimetype !== 'application/pdf') {
            return res.status(400).json({ msg: "Only PDF files are allowed" });
        }

        // Convert buffer to base64 (for Cloudinary upload)
        const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        // Upload to Cloudinary with proper settings for PDF viewing
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            resource_type: "auto", // Changed from "raw" to "auto"
            folder: "lms-course-pdfs",
            format: "pdf",
            type: "upload",
            access_mode: "public" // Make sure it's publicly accessible
        });

        console.log("Cloudinary Upload Response:", uploadResponse);

        // For PDFs uploaded as 'raw', use the original secure_url
        // Cloudinary automatically serves PDFs with correct headers
        const pdfUrl = uploadResponse.secure_url;

        // Return the URLs
        res.json({
            success: true,
            pdfUrl: pdfUrl, // For viewing
            downloadUrl: pdfUrl, // Same URL for download
            pdfPublicId: uploadResponse.public_id,
            msg: "PDF uploaded successfully"
        });

    } catch (error) {
        console.error("Upload error:", error);
        return res.status(500).json({ 
            msg: "Error uploading PDF",
            error: error.message 
        });
    }
}

// Delete PDF from Cloudinary
async function DeletePDF(req, res) {
    try {
        const { publicId } = req.body;

        if (!publicId) {
            return res.status(400).json({ msg: "Public ID is required" });
        }

        // Try deleting as different resource types
        try {
            await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
        } catch (err) {
            // If fails, try as image (in case resource_type was auto)
            await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
        }

        res.json({
            success: true,
            msg: "PDF deleted successfully"
        });

    } catch (error) {
        console.error("Delete error:", error);
        return res.status(500).json({ msg: "Error deleting PDF" });
    }
}

module.exports = {
    UploadPDF,
    DeletePDF
};