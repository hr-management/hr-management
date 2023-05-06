const chai = require("chai");
require("dotenv").config();
const expect = chai.expect;
const request = require("supertest");
const server = require("../server");
const connectMongoose = require("./utils/connectMongoose");
const RegistrationHistoryModel = require("../models/registrationHistory");
const UserModel = require("../models/User");

describe("HR Invitation", () => {
  after(async () => {
    await RegistrationHistoryModel.deleteMany();
    await UserModel.deleteMany();
  });

  it("should connect to mongodb", connectMongoose);
  describe("", () => {
    let HRToken;
    before(async () => {
      await RegistrationHistoryModel.deleteMany();
      await UserModel.deleteMany();
      const newHR = new UserModel({
        username: "HR4",
        email: "hr4@gmail.com",
        password: "HR4123",
        role: "HR",
      });
      await UserModel.register(newHR);
      const res = await request(server).post("/api/auth/user/login").send({
        username: "HR4",
        password: "HR4123",
      });
      HRToken = res.body.token;
    });

    it("should success to make invitation", async () => {
      const res = await request(server)
        .post("/api/employees/invitation")
        .send({
          name: "user1",
          email: "user1@gmail.com",
        })
        .set({ Authorization: `Bearer ${HRToken}` });
      expect(res.statusCode).to.equal(200);
      expect(res.body.message).to.equal("invited");
    });

    it("should fail to use exist email to make invitation", async () => {
      const res = await request(server)
        .post("/api/employees/invitation")
        .send({
          name: "user1",
          email: "user1@gmail.com",
        })
        .set({ Authorization: `Bearer ${HRToken}` });
      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal("Email address is already in use");
    });
    it("should fail without name to make invitation", async () => {
      const res = await request(server)
        .post("/api/employees/invitation")
        .send({
          email: "user2@gmail.com",
        })
        .set({ Authorization: `Bearer ${HRToken}` });
      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal("Please provide name.");
    });
    it("should get one data in invitation history", async () => {
      const res = await request(server)
        .get("/api/employees/invitationHistory")
        .set({ Authorization: `Bearer ${HRToken}` });
      expect(res.statusCode).to.equal(200);
      expect(res.body.history.length).to.equal(1);
    });

    it("should get new employee email from token", async () => {
      // get registrationLink from database
      const res = await request(server)
        .get("/api/employees/invitationHistory")
        .set({ Authorization: `Bearer ${HRToken}` });
      const employeeEmail = res.body.history[0].email;
      const link = res.body.history[0].registrationLink;
      const token = link.split("token=")[1];
      // use token to get new employee email
      const user = await request(server)
        .get("/api/employees/newApplicationInfo")
        .set({ Authorization: `Bearer ${token}` });
      expect(user.statusCode).to.equal(200);
      expect(user.body.user).to.equal(employeeEmail);
    });
    it("should not get new employee email without token", async () => {
      const user = await request(server).get(
        "/api/employees/newApplicationInfo"
      );
      expect(user.statusCode).to.equal(403);
      expect(user.body.message).to.equal("No token provided");
    });
    it("should not get new employee email without valid token", async () => {
      const user = await request(server)
        .get("/api/employees/newApplicationInfo")
        .set({ Authorization: `Bearer ${"invalid token"}` });
      expect(user.statusCode).to.equal(403);
      expect(user.body.message).to.equal("jwt malformed");
    });
  });
});
