import express from "express";
import path from "path";
import multer from "multer";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

const __dirname = path.resolve();

const app = express();
const port = 8000;
const s3Client = new S3Client({ region: "us-east-1" });
const inBucketName = "datasetees";

const createUploadsFolderIfNotExists = (req, res, next) => {
  const uploadDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  next();
};

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post(
  "/",
  createUploadsFolderIfNotExists,
  upload.single("inputFile"),
  async (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    var objectParams = {
      Bucket: inBucketName,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await s3Client.send(new PutObjectCommand(objectParams));

    res.status(200).send("File upload successful");
  }
);
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
