const db = require("../database/dbConfig.js");
const request = require("supertest");

//testing these
const server = require("../api/server.js");
const Users = require("./user-model.js");
const Routes = require("./routes.js");

// insert tests for the endpoints here

// ideas for testing...
//

describe("login", () => {
  it("is db in development? let's find out~", () => {
    expect(process.env.DB).toBe("development");
  });

  describe("GET /", () => {
    it("should return 404 lol", () => {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(404);
        });
    });

    describe("/api/login", () => {
      it("i should get that error", () => {
        return request(server)
          .post("/api/login")
          .then(res => {
            expect(res.status).toBe(500);
          });
      });
    });
  });
});
