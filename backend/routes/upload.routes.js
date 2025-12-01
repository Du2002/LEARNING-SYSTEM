const { Router } = require("express");
const multer = require("multer");
const { UploadPDF, DeletePDF } = require("../controller/upload.controller");
const { authenticateAdmin } = require("../middleware/admin.middleware");

const uploadRouter = Router();

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

// Upload PDF (Admin only)
uploadRouter.post("/pdf", authenticateAdmin, upload.single('pdf'), UploadPDF);

// Delete PDF (Admin only)
uploadRouter.delete("/pdf", authenticateAdmin, DeletePDF);

module.exports = uploadRouter;