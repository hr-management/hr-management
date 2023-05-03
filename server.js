const express = require("express");
const server = express();

const cors = require("cors");
server.use(cors());

server.get("/", (req, res) => {
  res.send("HR management");
});

server.all("*", (req, res) => {
  res.json({ message: "./pages/404page" });
});

module.exports = server;
