const express = require("express");
const server = express();
const hrRouter = require("./routers/hrRouter");
const housingRouter = require('./routers/housingRouter');
const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')
const fileRouter = require('./routers/fileRouter')

const cors = require("cors");
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("HR management");
});

// route for file uploads
server.use('/api', fileRouter);

server.use("/api/auth", authRouter);
server.use("/api/employees", hrRouter);
server.use('/api/housing', housingRouter);
server.use('/api/user', userRouter);

// Serving static files 
server.use(express.static('public'));

server.all("*", (req, res) => {
  res.json({ message: "./pages/404page" });
});


module.exports = server;
