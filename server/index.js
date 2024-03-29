const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("this is home page");
});

app.listen(4500, () => {
  console.log("server is running on port 4500");
});
