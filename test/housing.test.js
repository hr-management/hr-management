const chai = require("chai");
const expect = chai.expect;
const app = require("../server");
const request = require("supertest");

describe("Housing Controller", () => {
  it("should get all housing details", async () => {
    const res = await request(app).get("/house-details");
    expect(res.status).to.equal(200);
    // console.log(res.body, res.status);
    // expect(res.body).to.be.an("array");
  });

  let reportId = "64530a4b3e28c3fb76fce159";

  it("should create a new facility report", async () => {
    const res = await request(app).post("/facility-reports").send({
      housingId: "64530a4b3e28c3fb76fce156",
      title: "Test Report",
      description: "This is a test report",
      createdBy: "Test User",
    });
    expect(res.status).to.equal(201);
    // expect(res.body).to.be.an("object");
    // expect(res.body.title).to.equal("Test Report");
    // expect(res.body.description).to.equal("This is a test report");
    // expect(res.body.createdBy).to.equal("Test User");
    reportId = res.body._id;
  });

  // it("should get all facility reports", async () => {
  //   const res = await request(app).get("/facility-reports");
  //   expect(res.status).to.equal(200);
  //   expect(res.body).to.be.an("array");
  // });

  it("should get all facility reports", function (done) {
    request(app)
      .get("/facility-reports")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        // expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should get a specific facility report", async () => {
    const res = await request(app).get(`/facility-reports/${reportId}`);
    expect(res.status).to.equal(200);
    // expect(res.body).to.be.an("object");
    // expect(res.body.title).to.equal("Test Report");
    // expect(res.body.description).to.equal("This is a test report");
    // expect(res.body.createdBy).to.equal("Test User");
  });

  it("should get all comments on a specific facility report", async () => {
    const res = await request(app).get(
      `/facility-reports/${reportId}/comments`
    );
    expect(res.status).to.equal(200);
    // expect(res.body).to.be.an("array");
  });

  let commentId = "64532723e0e3d43d02cf7f91";

  it("should add a comment to a specific facility report", async () => {
    const res = await request(app)
      .post(`/facility-reports/${reportId}/comments`)
      .send({
        description: "This is a test comment",
        createdBy: "Test User",
      });
    expect(res.status).to.equal(201);
    // expect(res.body).to.be.an("object");
    // expect(res.body.description).to.equal("This is a test comment");
    // expect(res.body.createdBy).to.equal("Test User");
    commentId = res.body._id;
  });

  it("should update a comment on a specific facility report", async () => {
    const res = await request(app)
      .put(`/facility-reports/${reportId}/comments/${commentId}`)
      .send({
        description: "This is an updated comment",
      });
    expect(res.status).to.equal(200);
    // expect(res.body).to.be.an("object");
    // expect(res.body.description).to.equal("This is an updated comment");
  });
});
