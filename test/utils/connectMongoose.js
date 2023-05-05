const mongoose = require("mongoose");
require("dotenv").config();
const chai = require("chai");
const expect = chai.expect;

module.exports = async function connectMongoose() {
  mongoose.connection.on("connected", () => {
    expect(mongoose.connection.readyState).to.equal(1);
  });

  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_KEY}@cluster0.bdlgbaa.mongodb.net/hr_management`
  );
};
