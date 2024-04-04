const express = require("express");
const http = require("http");
const cors = require("cors");
const socket = require("socket.io");

const app = express();
app.use(cors);

const server = http.createServer(app);

server.listen(4500, () => {
  console.log("server is running on port 4500");
});

const io = socket(server);

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("send-changes", (delta) => {
    // console.log(delta);
    socket.broadcast.emit("receive-changes", delta);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});


