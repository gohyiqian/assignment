import chai from "chai";
import chaiHttp from "chai-http";
import server from "./index.js";

chai.should();
chai.use(chaiHttp);

describe("/GET/user/:userId", () => {
  it("it should get user balance with userId = 1", async () => {
    chai
      .request(server)
      .get("/user/1")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("id");
        res.body.should.have.property("USD");
        res.body.id.should.equal("1");
      });
  });

  it("it should get user balance with userId = 2", async () => {
    chai
      .request(server)
      .get("/user/2")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("id");
        res.body.should.have.property("USD");
        res.body.id.should.equal("2");
      });
  });

  it("it should get user balance with userId = 3", async () => {
    chai
      .request(server)
      .get("/user/3")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("id");
        res.body.should.have.property("USD");
        res.body.id.should.equal("3");
      });
  });

  it("invalid user id", async () => {
    chai
      .request(server)
      .get("/user/4")
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        res.body.error.should.equal("user does not exist");
      });
  });
});
