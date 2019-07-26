// might need to implement in a different component for super secrecy

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "secret here shh"
};
