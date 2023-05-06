const chai = require("chai");
require("dotenv").config();
const expect = chai.expect;
const request = require("supertest");
const server = require("../server");
const UserModel = require("../models/User");
const connectMongoose = require("./utils/connectMongoose");

const mockUser = {
  username: "mockUserTest",
  password: "mock123",
  email: "mockUserTest@gmail.com",
};

describe("Auth Routes", () => {
  after(async () => {
    // Delete test data
    await UserModel.deleteOne({ email: mockUser.email });
  });

  it("should connect to mongodb", connectMongoose);

  describe("Auth Routes", () => {
    let jwtToken = "";

    it("should be registered successfull", async () => {
      const res = await request(server)
        .post("/api/auth/user/signup")
        .send(mockUser);
      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
    });

    it("should register failed", async () => {
      const res = await request(server)
        .post("/api/auth/user/signup")
        .send(mockUser);
      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal("Email address is already in use");
    });

    it("should register failed", async () => {
      const res = await request(server)
        .post("/api/auth/user/signup")
        .send({
          username: mockUser.username,
          password: mockUser.password,
          email: "another" + mockUser.email,
        });
      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal("Username is already in use");
    });

    it("should login successfully", async () => {
      const res = await request(server).post("/api/auth/user/login").send({
        username: mockUser.username,
        password: mockUser.password,
      });

      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      jwtToken = res.body.token;
    });

    it("should login failed", async () => {
      const res = await request(server)
        .post("/api/auth/user/login")
        .send({
          username: mockUser.username + "error",
          password: mockUser.password,
        });

      expect(res.status).to.equal(400);
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal("Invalid username or password");
    });

    it("should get userInfo successfully", async () => {
      const res = await request(server)
        .get("/api/auth/user/info")
        .send({})
        .set({ Authorization: `Bearer ${jwtToken}` });

      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
      expect(res.body.user.username).to.equal(mockUser.username);
      expect(res.body.user.email).to.equal(mockUser.email);
    });

    it("should get userInfo failed", async () => {
      const res = await request(server)
        .get("/api/auth/user/info")
        .send({})
        .set({ Authorization: `Bearer ${jwtToken}ErrorToken` });

      expect(res.status).to.equal(403);
      expect(res.body.success).to.equal(false);
    });

    const updates = {
      firstName: "firstName",
      lastName: "lastName",
      middleName: "middleName",
      preferredName: "preferredName",
    };

    it("should update userInfo successfully", async () => {
      const res = await request(server)
        .put("/api/auth/user/info")
        .send(updates)
        .set({ Authorization: `Bearer ${jwtToken}` });

      expect(res.status).to.equal(200);
      expect(res.body.success).to.equal(true);
    });

    it("sshould be updated successfully", async () => {
      const res = await request(server)
        .get("/api/auth/user/info")
        .set({ Authorization: `Bearer ${jwtToken}` });

      expect(res.status).to.equal(200);
      expect(res.body.user.firstName).to.equal(updates.firstName);
      expect(res.body.user.lastName).to.equal(updates.lastName);
      expect(res.body.user.middleName).to.equal(updates.middleName);
      expect(res.body.user.preferredName).to.equal(updates.preferredName);
    });

    it("should update userInfo failed", async () => {
      const res = await request(server)
        .put("/api/auth/user/info")
        .send({
          firstName: "firstName",
          lastName: "lastName",
          middleName: "middleName",
          preferredName: "preferredName",
        })
        .set({ Authorization: `Bearer ${jwtToken}ErrorToken` });

      expect(res.status).to.equal(403);
      expect(res.body.success).to.equal(false);
    });
  });
});
