import { io } from "socket.io-client";

const URL = "http://localhost:3000";

const socket = io(URL, {
  withCredentials: true,
});

socket.on("connect", () => {
  console.log("Connected!");
});

socket.on("connect_error", (error) => {
  console.error("Connection error:", error.message);
});

export default socket;