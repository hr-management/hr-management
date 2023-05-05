// housing.test.js

const chai = require("chai");
const expect = chai.expect;
const supertest = require("supertest");
const app = require("../app"); // Import your Express app

const request = supertest(app);

describe("API tests", () => {
  it("GET / should return 200 OK", (done) => {
    request
      .get("/")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
