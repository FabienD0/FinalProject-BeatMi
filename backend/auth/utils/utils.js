const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
// const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
// const PRIVATE_KEY = process.env.PRIVATE_KEY2;

//Verify if the password entered by the user matched the on in the DB
const validPassword = (password, hash, salt) => {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");
  return hash === hashVerify;
};

//Generate a password when a user register
const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return {
    salt: salt,
    hash: genHash,
  };
};

//Used for the payload in the MongoDB user ID
const issueJWT = (user, PRIVATE_KEY) => {
  const _id = user._id;

  const expiresIn = "14d";

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIVATE_KEY, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};

module.exports = {
  validPassword,
  genPassword,
  issueJWT,
};
