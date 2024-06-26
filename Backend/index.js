const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const http = require("http");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");

const { docRouter } = require("./routes/docs.routes");

require("dotenv").config();

const app = express();
const server = http.createServer(app);




server.listen(4500, async () => {
  try {
    await connection;
    console.log("server is running on port 4500 & db is connected");
  } catch (error) {
    console.log(`Error occurred : ${error}`);
  }

});

const io = socket(server);

io.on("connection", (socket) => {
  console.log("user connected", socket.id);

  socket.on("send-changes", (delta) => {
    // console.log(delta);
    socket.broadcast.emit("receive-changes", delta);
  });

  socket.on("send-cursor", (cursorData) => {
    socket.broadcast.emit("receive-cursor", cursorData);
  });


  socket.on("message", (data) => {
    console.log("Message received:", data);
    // Broadcast the message to all connected clients
    io.emit("message", JSON.stringify(data));
  });


  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
app.use("/docs", docRouter);


app.get("/", (req, res) => {
  res.send({
    msg: "This is the home route",
  });
});


