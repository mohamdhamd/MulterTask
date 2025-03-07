import express from 'express';
import multer from "multer";
import path from 'path';
import Image from "../models/images.js";

const homeRouter = express.Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        const code = Math.floor(100000 + Math.random() * 900000); 
        const ext = path.extname(file.originalname); 
        cb(null, Date.now() + "_" + code + ext); 
    }
});


const upload = multer({ storage });

// for single image
// homeRouter.post("/upload", upload.single("image"), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ message: "No file uploaded!" });
//     }
//     res.status(200).json({
//         message: "File uploaded successfully!",
//         fileName: req.file.filename,
//         filePath: `/uploads/${req.file.filename}`
//     });
// });


// // for multe images
// homeRouter.post("/upload", upload.array("images", 5), (req, res) => {
//     if (!req.files) {
//         return res.status(400).json({ message: "No files uploaded!" });
//     }
//     const fileNames = req.files.map(file => file.filename);
//     res.status(200).json({
//         message: "Files uploaded successfully!",
//         fileNames: fileNames,
//         filePaths: fileNames.map(fileName => `/uploads/${fileName}`)
//     });
// });


// Upload multiple images & save to MongoDB
homeRouter.post("/upload", upload.array("images", 5), async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded!" });
    }

    try {
        const images = req.files.map((file) => ({
            name: file.filename,
            id: "123456", 
        }));

        await Image.insertMany(images);

        res.status(200).json({
            message: "Files uploaded and saved to database successfully!",
            fileNames: images.map((img) => img.name),
            filePaths: images.map((img) => `/uploads/${img.name}`),
        });
    } catch (error) {
        console.error("Error saving to database:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// get images to show it on frontend 
homeRouter.get("/images", async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json({
            message: "Images retrieved successfully!",
            images: images.map((img) => ({
                name: img.name,
                id: img.id,
            })),
        });
    } catch (error) {
        console.error("Error retrieving images:", error);
        res.status(500).json({ message: "Server error" });
    }
});






export default homeRouter;
