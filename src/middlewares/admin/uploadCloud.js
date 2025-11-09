const multer = require("multer");
const cloudinary = require("./cloudinary");
const fs = require("fs");

// Multer lưu file tạm
const upload = multer({ dest: "uploads/" });

module.exports.uploadSingle = (fieldName) => {
  return [
    upload.single(fieldName),
    async (req, res, next) => {
      try {
        if (!req.file) {
          return next();
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "products",
        });

        // Xoá file tạm sau khi upload
        fs.unlinkSync(req.file.path);

        // Lưu URL vào req để controller dùng
        req.body.thumbnail = result.secure_url;
        next();
      } catch (err) {
        console.error("Upload error:", err);
        return res.status(500).json({ message: "Upload failed" });
      }
    },
  ];
};