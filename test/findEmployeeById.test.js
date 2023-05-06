const chai = require("chai");
require("dotenv").config();
const expect = chai.expect;
const request = require("supertest");
const server = require("../server");
const connectMongoose = require("./utils/connectMongoose");
const { ObjectId } = require("mongodb");
const UserModel = require("../models/User");

describe("findEmployeeById middleware ", () => {
  after(async () => {
    await UserModel.deleteMany();
  });
  it("should connect to mongodb", connectMongoose);
  describe("", () => {
    let HRToken;
    before(async () => {
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
    it("should fail with invalid id", async () => {
      const res = await request(server)
        .get("/api/employees/invalidid")
        .set({ Authorization: `Bearer ${HRToken}` });
      expect(res.statusCode).to.equal(400);
      expect(res.body.message).to.equal("Invalid Id.");
    });
    it("should fail if can't find employee", async () => {
      const res = await request(server)
        .get(`/api/employees/64530a4b3e28c3fb76fce156`)
        .set({ Authorization: `Bearer ${HRToken}` });
      expect(res.statusCode).to.equal(404);
      expect(res.body.message).to.equal("This employee is not exist.");
    });
  });
});
