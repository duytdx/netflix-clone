import express from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import storage from "../config/firebaseStorage.js";

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
})

router.post("/", upload.single("file"), async (req, res) => {
    try {
        // get file from request
        const file = req.file;
        // create new filename
        if (file) {
            const fileName = `${uuidv4()}${path.extname(file.originalname)}`;

            // Kiểm tra kích thước file
            const maxSize = 5 * 1024 * 1024; // 5MB
            if (file.size > maxSize) {
                return res.status(400).json({ message: "File size too large. Max 5MB allowed." });
            }

            // Kiểm tra định dạng file
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!allowedTypes.includes(file.mimetype)) {
                return res.status(400).json({ message: "Invalid file type. Only JPG, PNG & GIF allowed." });
            }

            const blob = storage.file(fileName);
            const blobStream = blob.createWriteStream({
                resumable: false,
                metadata: {
                    contentType: file.mimetype,
                }
            })

            // Xử lý lỗi stream
            blobStream.on("error", (error) => {
                console.error("Upload error:", error);
                res.status(500).json({ message: "Error uploading file" });
            })

            // Xử lý thành công
            blobStream.on("finish", async () => {
                try {
                    // get public url
                    const publicUrl = `https://storage.googleapis.com/v0/b/${storage.name}/o/${fileName}?alt=media`;
                    // return response
                    res.status(200).json(publicUrl);
                } catch (error) {
                    console.error("Error getting public URL:", error);
                    res.status(500).json({ message: "Error generating public URL" });
                }
            })

            // end stream
            blobStream.end(file.buffer);
        } else {
            res.status(400).json({ message: "Please upload a file" });
        }

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

export default router;
