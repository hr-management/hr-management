const chai = require("chai");
require("dotenv").config();
const expect = chai.expect;
const request = require("supertest");
const server = require("../server");

describe("authorization middleware ", () => {
  it("should fail without token", async () => {
    const res = await request(server).post("/api/employees/invitation").send({
      email: "user2@gmail.com",
      name: "user2",
    });
    expect(res.statusCode).to.equal(403);
    expect(res.body.message).to.equal("No token provided");
  });
  it("should fail without valid token", async () => {
    const res = await request(server)
      .post("/api/employees/invitation")
      .send({
        email: "user2@gmail.com",
        name: "user2",
      })
      .set({ Authorization: `Bearer invaildtoken` });
    expect(res.statusCode).to.equal(403);
    expect(res.body.message).to.equal("jwt malformed");
  });
});
