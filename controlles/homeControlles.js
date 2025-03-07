const upload = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded!" });
    }
    res.status(200).json({
        message: "File uploaded successfully!",
        fileName: req.file.filename,
        filePath: `/uploads/${req.file.filename}`
    });
}
export default {
    upload
}