const { writeFileSync, readFileSync } = require("fs");
const { gzip } = require("node-gzip");
const path = require("path");
const { Files } = require("./db");
const multer = require("multer");

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const zipFile = async (file, fileId) => {
  // Create zipped file
  const fileBuffer = readFileSync(file.path);
  const zippedFile = await gzip(fileBuffer);

  // Define path for saving zipped file
  const originalPath = file.path;
  const zippedFilePath = path.join(
    path.dirname(originalPath),
    `${path.basename(originalPath, path.extname(originalPath))}.gz`
  );

  // Save zipped file to disk
  writeFileSync(zippedFilePath, zippedFile, { encoding: null });

  const response = await Files.update(
    { zippedFilePath, status: "Done" },
    {
      where: {
        id: fileId,
      },
    }
  );

  return response;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    const uniqueSuffix = Date.now();
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});

module.exports = { delay, zipFile, storage };
