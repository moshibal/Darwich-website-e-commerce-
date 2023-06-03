import express from "express";
import multer from "multer";
import AppError from "../utilities/appError.js";

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `product-${req.params.id}-${Date.now()}.${ext}`);
  },
});
const multerFilter = (req, file, cd) => {
  if (file.mimetype.startsWith("image")) {
    cd(null, true);
  } else {
    cd(new AppError("Not an image ! Please upload only images", 400), false);
  }
};
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
const uploadProductPhoto = upload.single("image");
const router = express.Router();
router.post("/:id", uploadProductPhoto, (req, res, next) => {
  res.send(`/api/uploads/${req.file.filename}`);
});
export default router;
