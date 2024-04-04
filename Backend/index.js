const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const http = require("http");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
<<<<<<< HEAD
const { docRouter } = require("./routes/docs.routes");
=======
>>>>>>> 392e77953dc1168bace8091ce4be4fede20e9736
require("dotenv").config();

const app = express();
const server = http.createServer(app);

<<<<<<< HEAD
server.listen(8000, () => {
  console.log("server is running on port 8000");
=======
server.listen(4500, async () => {
  try {
    await connection;
    console.log("server is running on port 4500 & db is connected");
  } catch (error) {
    console.log(`Error occurred : ${error}`);
  }
>>>>>>> 392e77953dc1168bace8091ce4be4fede20e9736
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
<<<<<<< HEAD
=======

  socket.on("message", (data) => {
    console.log("Message received:", data);
    // Broadcast the message to all connected clients
    io.emit("message", JSON.stringify(data));
  });
>>>>>>> 392e77953dc1168bace8091ce4be4fede20e9736

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

app.use(express.json());
app.use(cors());
app.use("/users", userRouter);
<<<<<<< HEAD
app.use("/docs", docRouter);
=======
>>>>>>> 392e77953dc1168bace8091ce4be4fede20e9736

app.get("/", (req, res) => {
  res.send({
    msg: "This is the home route",
  });
});

// app.listen(process.env.PORT, async()=>{
//     try {
//         await connection;
//         console.log(`Connected with Database`);
//         console.log(`Server is running on port : ${process.env.PORT}`);
//     } catch (error) {
//         console.log(`Error occurred : ${error}`);
//     }
// })
