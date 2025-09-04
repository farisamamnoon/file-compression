const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const multer = require("multer");

const { configDotenv } = require("dotenv");
configDotenv();

const { Files } = require("./db");
const { zipFile, delay, storage } = require("./utils");

const upload = multer({ storage: storage });

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.post("/api/upload", upload.single("file"), async (req, res) => {
  const file = await Files.create({
    title: req.file.originalname,
    filePath: req.file.path,
    size: req.file.size,
  });

  res.json({
    status: 201,
  });

  const [affectedRows] = await zipFile(req.file, file.id);
  await delay(5000);
  if (affectedRows > 0) {
    io.emit("finished");
  }
});

app.get("/api/", async (req, res) => {
  const files = await Files.findAll();

  res.json({
    data: files,
    status: 200,
  });
});

server.listen(3000, async () => {
  await Files.sync();
  console.log("Server running");
});
