"use strict";
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, CLOUDINARY_API_SECRET } = process.env;
const cloudinary = require("cloudinary").v2;

/* Mongo Options */
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/* Cloudinary Config */
cloudinary.config({
  cloud_name: "dtvq13klo",
  api_key: "532881555394562",
  api_secret: CLOUDINARY_API_SECRET,
});

/*==================================
        Get a user by Beat Id
====================================*/
const getUserByBeatId = async (req, res) => {
  const { id } = req.params;
  const info = req.body.info;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const results = await db.collection("users").findOne({ beatCreated: id });

    //Get Avatar
    if (results && info === "avatar") {
      res.status(200).json({ status: 200, avatar: results.avatar });
      //Get username & avatar
    } else if (results && info === "username&avatar") {
      res.status(200).json({
        status: 200,
        avatar: results.avatar,
        username: results.username,
      });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Can't retrieve user on the database" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};
/*==================================
        Get a user by  Id
====================================*/
const getUserById = async (req, res) => {
  const { id } = req.params;
  const info = req.body.info;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const results = await db
      .collection("users")
      .findOne({ _id: new ObjectId(id) });

    //Get username & avatar
    if (results && info === "username&avatar") {
      res.status(200).json({
        status: 200,
        avatar: results.avatar,
        username: results.username,
      });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Can't retrieve user on the database" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};
/*==============================
   Add created beat to profile
===============================*/
const addBeatUser = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const beat = await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(req.body._id) },
        { $push: { beatCreated: req.body.beatId } }
      );

    if (beat.acknowledged) {
      res.status(200).json({ status: 200, message: "Beat added" });
    } else {
      res.status(404).json({ status: 404, message: "Error" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

/*==============================
   Add liked beat to profile
===============================*/
const likeBeatUser = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const beat = await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(req.body._id) },
        { $push: { beatLiked: req.body.beatId } }
      );

    if (beat.acknowledged) {
      res.status(200).json({ status: 200, message: "Beat liked" });
    } else {
      res.status(404).json({ status: 404, message: "Error" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

/*==============================
   Change the avatar of a user
===============================*/
const changeAvatar = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    //Add customAvatar to the user
    if (req.body.addToUser) {
      const customAvatar = await db
        .collection("users")
        .updateOne(
          { email: req.body.email },
          { $push: { customAvatar: req.body.avatar } }
        );
    }

    //Change to custom avatar
    if (req.body.isCustom) {
      const avatar = await db
        .collection("users")
        .updateOne(
          { email: req.body.email },
          { $set: { avatar: req.body.avatar.url } }
        );

      if (avatar.acknowledged) {
        res.status(200).json({ status: 200, message: "Avatar changed" });
      } else {
        res.status(404).json({ status: 404, message: "Error" });
      }

      //Change to default avatar
    } else if (!req.body.isCustom) {
      const avatar = await db
        .collection("users")
        .updateOne(
          { email: req.body.email },
          { $set: { avatar: req.body.avatar } }
        );

      if (avatar.acknowledged) {
        res.status(200).json({ status: 200, message: "Avatar changed" });
      } else {
        res.status(404).json({ status: 404, message: "Error" });
      }
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

/*==============================
Remove a custom avatar from a user
===============================*/
const removeAvatar = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const customAvatar = await db
      .collection("users")
      .updateOne(
        { email: req.body.email },
        { $pull: { customAvatar: req.body.avatar } }
      );

    if (customAvatar.acknowledged) {
      cloudinary.uploader.destroy(req.body.avatar.publicId);
      res.status(200).json({ status: 200, message: "Custom avatar deleted" });
    } else {
      res.status(404).json({ status: 404, message: "Error" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

/*==============================
Remove created beat from profile
===============================*/
const removeBeatUser = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const beat = await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(req.body._id) },
        { $pull: { beatCreated: req.body.beatId } }
      );

    if (beat.acknowledged) {
      res.status(200).json({ status: 200, message: "Beat removed" });
    } else {
      res.status(404).json({ status: 404, message: "Error" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

/*==============================
   Remove liked beat to profile
===============================*/
const removeLikeBeatUser = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const avatar = await db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(req.body._id) },
        { $pull: { beatLiked: req.body.beatId } }
      );

    if (avatar.acknowledged) {
      res.status(200).json({ status: 200, message: "Beat unliked" });
    } else {
      res.status(404).json({ status: 404, message: "Error" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

/*==============================
Remove liked beat to all the profile
===============================*/
const removeLikeBeatAllUser = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const removeBeatId = await db
      .collection("users")
      .updateMany({}, { $pull: { beatLiked: { $in: req.body.beatId } } });

    if (removeBeatId.acknowledged) {
      res
        .status(200)
        .json({ status: 200, message: "Beat unliked on all accounts" });
    } else {
      res.status(404).json({ status: 404, message: "Error" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

/*==============================
   Remove user from database
===============================*/
const removeUser = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const userDeleted = await db
      .collection("users")
      .deleteOne({ _id: new ObjectId(req.body._id) });

    if (userDeleted.acknowledged && userDeleted.deletedCount > 0) {
      res.status(200).json({ status: 200, message: "User deleted" });
    } else {
      res.status(404).json({ status: 404, message: "Error" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  changeAvatar,
  removeUser,
  likeBeatUser,
  removeLikeBeatUser,
  getUserByBeatId,
  addBeatUser,
  removeBeatUser,
  removeLikeBeatAllUser,
  getUserById,
  removeAvatar,
};
