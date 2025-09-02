import { io } from "socket.io-client";

const URL =
  process.env.NODE_ENV === "production" ? undefined : "/api";

export const socket = io(URL, {
  withCredentials: true,
});
