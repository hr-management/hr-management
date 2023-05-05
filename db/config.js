require("dotenv").config();
const mongoose = require("mongoose");

function mongooseDB(success) {
  mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_KEY}@cluster0.bdlgbaa.mongodb.net/hr_management`
  );
  mongoose.connection.once("open", () => {
    console.log("connected mongoDB");
    success();
  });
  mongoose.connection.on("error", (error) => {
    console.log(error);
  });
  mongoose.connection.on("close", () => {
    console.log("disconnected");
  });
}

module.exports = mongooseDB;
