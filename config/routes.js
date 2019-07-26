const axios = require("axios");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("./user-model.js");
const secret = require("../config/secret.js");

//need this
require("dotenv").config();

const { authenticate } = require("../auth/authenticate");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

// implement middleware to generateToken

function generateToken(user) {
  const payload = { username: user.username };
  const secret = process.env.JWT_SECRET;
}

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  // secret in separate component

  const options = {
    expiresIn: "10h"
  };
  return jwt.sign(payload, jwtKey, options);
}

function register(req, res) {
  // implement user registration

  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 11);
  user.password = hash;

  db.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });

  // let user = req.body;
  // const hash = bcrypt.hashSync(user.password, 11);
  // user.password = hash;

  // db.add(user)
  //   .then(registered => {
  //     const token = generateToken(registered);
  //     res.status(201).json(registered);
  //   })
  //   .catch(error => {
  //     res.status(500).json({ message: "could not register. :c" });
  //   });
}

function login(req, res) {
  // implement user login

  let { username, password } = req.body;

  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        // produce a token
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });

  // let { username, password } = req.body;

  // db.findBy({ username })
  //   .first()
  //   .then(user => {
  //     if (user && bcrypt.compareSync(password, user.password)) {
  //       const token = generateToken(user);

  //       res.status(200).json({
  //         message: "logged in, nice",
  //         token
  //       });
  //     } else {
  //       res.status(401).json({ message: "wrong login info" });
  //     }
  //   })
  //   .catch(error => {
  //     res.status(500).json(error);
  //   });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
