const express = require("express");
const multer = require("multer");
const { gzip } = require("node-gzip");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");
const cors = require("cors");
const { Files } = require("./db");

const upload = multer({ dest: "uploads/" });

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

const zipFile = async (file, fileId) => {
  const zippedFile = await gzip(file);

  const response = await Files.create({ zippedFile, status: "Done" });
  io.emit("finished", response.status);
};

app.post("/upload", upload.single("file"), async (req, res) => {
  const file = await Files.create({ title: req.body.title, file: req.file });

  zipFile(file.file, file.id);
  res.json({
    status: 201,
  });
});

app.get("/", async (req, res) => {
  const files = await Files.findAll();

  res.json({
    data: files,
    status: 200,
  });
});

server.listen(3000, async () => {
  await Files.sync();
  console.log("server running at http://localhost:3000");
});
