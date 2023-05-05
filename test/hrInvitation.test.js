const chai = require("chai");
require("dotenv").config();
const expect = chai.expect;
const request = require("supertest");
const server = require("../server");
const connectMongoose = require("./utils/connectMongoose");
const RegistrationHistoryModel = require("../models/registrationHistory");

describe("HR Invitation", () => {
  after(async () => {
    await RegistrationHistoryModel.deleteMany();
  });

  it("should connect to mongodb", connectMongoose);
  describe("", () => {
    before(async () => {
      await RegistrationHistoryModel.deleteMany();
    });

    it("should success to make invitation", async () => {
      const res = await request(server).post("/api/employees/invitation").send({
        name: "user1",
        email: "user1@gmail.com",
      });
      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal("invited");
    });

    it("should fail to use exist email to make invitation", async () => {
      const res = await request(server).post("/api/employees/invitation").send({
        name: "user1",
        email: "user1@gmail.com",
      });
      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal("Email address is already in use");
    });
    it("should fail without name to make invitation", async () => {
      const res = await request(server).post("/api/employees/invitation").send({
        email: "user2@gmail.com",
      });
      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal("Please provide name.");
    });
  });
});
