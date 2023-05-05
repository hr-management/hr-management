const express = require("express");
const server = express();
const hrRouter = require("./routers/hrRouter");
const housingRouter = require('./routers/housingRouter');
const authRouter = require('./routers/authRouter')
const upload = require('./utils/s3Handler').upload;

const cors = require("cors");
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("HR management");
});

// route for file uploads
server.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json({ message: 'File uploaded successfully', url: req.file.location });
});

server.use("/api/auth", authRouter);
server.use("/api/employees", hrRouter);
server.use('/api/housing', housingRouter);

server.all("*", (req, res) => {
  res.json({ message: "./pages/404page" });
});


module.exports = server;
