"use strict";
const { MongoClient } = require("mongodb");
const { genPassword, validPassword, issueJWT } = require("./utils/utils");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/*===========================
  Get all users from database
=============================*/
const getAllUsers = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const users = await db.collection("users").find().toArray();

    if (users) {
      res.status(200).json({ status: 200, users: users });
    } else {
      res.status(404).json({
        status: 404,
        message: "Can't retrieve any users in the database",
      });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

/*=========================================
  Validate an existing user and issue a JWT
=========================================*/
const loginUser = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const user = await db
      .collection("users")
      .findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "Could not find user. Please check your e-mail and try again.",
      });
    }

    const isValid = validPassword(req.body.password, user.hash, user.salt);

    if (isValid) {
      const tokenObject = issueJWT(user);

      res.status(200).json({
        status: 200,
        user: user,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      });
    } else {
      res.status(401).json({
        status: 401,
        message:
          "You entered the wrong password. Please check your password and try again.",
      });
    }

    client.close();
  } catch {
    res.status(500).json({ status: 500, message: err.message });
  }
};

/*===========================
     Register a new user
=============================*/
const registerUser = async (req, res) => {
  try {
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = {
      username: req.body.username,
      email: req.body.email,
      avatar: req.body.avatar,
      beatLiked: [],
      beatCreated: [],
      hash: hash,
      salt: salt,
    };

    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");
    const isExistingEmail = await db
      .collection("users")
      .findOne({ email: req.body.email });
    const isExistingUser = await db
      .collection("users")
      .findOne({ username: req.body.username });

    const isPasswordLongEnough = req.body.password.length >= 8;

    //Verify if there's a user with the same e-mail
    if (isExistingEmail) {
      res.status(409).json({
        status: 409,
        message:
          "Oops, it looks like this email is already in use. Please try logging in.",
      });
      //Verify if the password is long enough
    } else if (isExistingUser) {
      if (
        isExistingUser.username.toLowerCase() ===
        req.body.username.toLowerCase()
      ) {
        res.status(409).json({
          status: 409,
          message:
            "Oops, it looks like this username is already in use. Choose another one.",
        });
      }
    } else if (!isPasswordLongEnough) {
      res.status(409).json({
        status: 409,
        message:
          "Password must be at least 8 characters long. Please enter a password that is 8 characters or more.",
      });
    } else {
      const user = await db.collection("users").insertOne(newUser);
      if (user.acknowledged && !isExistingEmail && !isExistingUser) {
        res
          .status(201)
          .json({ status: 201, message: "User added", user: user });
      } else if (!user.acknowledged) {
        res.status(400).json({ status: 404, message: "Error" });
      }
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

/*===========================
    Get a single user
=============================*/
const getUser = async (req, res) => {
  if (req.user) {
    res.status(200).json({ status: 200, user: req.user });
  }
};

module.exports = {
  registerUser,
  getAllUsers,
  loginUser,
  getUser,
};
