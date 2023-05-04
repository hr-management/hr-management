const express = require("express");
const server = express();
const hrRouter = require("./routers/hrRouter");
const housingRouter = require('./routers/housingRouter');

const mongooseDB = require('./db/config');
const User = require("./models/User")

const cors = require("cors");
server.use(cors());

server.use(express.json());

server.get("/", (req, res) => {
  res.send("HR management");
});

server.use("/api/employees", hrRouter);

server.use('/api/housing', housingRouter);

server.all("*", (req, res) => {
  res.json({ message: "./pages/404page" });
});


module.exports = server;
