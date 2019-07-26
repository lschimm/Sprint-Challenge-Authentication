const db = require("../database/dbConfig.js");
const request = require("supertest");

const Users = require("./user-model.js");

// insert tests for the endpoints here

// describe("user model", () => {
//   beforeEach(async () => {
//     await db("users").truncate();
//   });

//   describe("add()", () => {
//     it("should be adding the users", async () => {
//       await User.add({ username: "user5" });

//       const users = await db("users");

//       expect(users).toHaveLength(1);
//     });
//   });
// });
