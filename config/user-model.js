const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findById,
  findBy //might not need but implemented in case
};

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function find() {
  return db("users").select("id", "username", "password");
}
