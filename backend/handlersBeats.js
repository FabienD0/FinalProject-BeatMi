"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

/*==================================
     Get all beats from database
====================================*/
const getAllBeats = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const results = await db.collection("beats").find().toArray();

    if (results) {
      res.status(200).json({ status: 200, beats: results });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Can't retrieve beats on the database" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

/*==================================
   Get all beats of an arist by USER
====================================*/
const getBeatsArtist = async (req, res) => {
  const { user } = req.params;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const results = await db
      .collection("beats")
      .find({ username: user })
      .toArray();

    if (results) {
      res.status(200).json({ status: 200, beat: results });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Can't retrieve beat on the database" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

/*==================================
            Get a beat by ID
====================================*/
const getBeat = async (req, res) => {
  const { id } = req.params;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const results = await db.collection("beats").findOne({ _id: id });

    if (results) {
      res.status(200).json({ status: 200, beat: results });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Can't retrieve beat on the database" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

/*==================================
          Delete beat by ID
====================================*/
const deleteBeat = async (req, res) => {
  const { id } = req.params;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const results = await db.collection("beats").deleteOne({ _id: id });

    if (results) {
      res.status(200).json({ status: 200, beat: results });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Can't retrieve beat on the database" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

/*==================================
    Delete all beats of a user
====================================*/
const deleteAllBeatByUser = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const results = await db
      .collection("beats")
      .deleteMany({ _id: { $in: req.body.beatId } });

    if (results.acknowledged) {
      res
        .status(200)
        .json({ status: 200, message: "Beats in the database removed" });
    } else {
      res
        .status(404)
        .json({ status: 404, message: "Can't retrieve beat on the database" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};
/*==================================
        Save beat on database
====================================*/
const saveBeat = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const beats = await db.collection("beats").insertOne(req.body);

    if (beats.acknowledged) {
      res.status(200).json({ status: 200, message: "Beat added" });
    } else {
      res.status(404).json({ status: 404, message: "Error" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

/*==================================
        Modify beat on database
====================================*/
const modifyBeat = async (req, res) => {
  const { id } = req.params;
  const {
    speed,
    drumAndMelody,
    chordToPiano,
    octave,
    drumKit,
    melodyKit,
    chordName,
    steps,
    isEdit,
  } = req.body.newDataBeat;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const beats = await db.collection("beats").updateOne(
      { _id: id },
      {
        $set: {
          speed: speed,
          drumAndMelody: drumAndMelody,
          chordToPiano: chordToPiano,
          octave: octave,
          drumKit: drumKit,
          melodyKit: melodyKit,
          chordName: chordName,
          steps: steps,
          isEdit: isEdit,
        },
      }
    );

    if (beats.acknowledged) {
      res.status(200).json({ status: 200, message: "Beat modified" });
    } else {
      res.status(404).json({ status: 404, message: "Error" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

/*==================================
        Add a comment on a beat
====================================*/
const addCommentBeat = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const beat = await db.collection("beats").updateOne(
      { _id: req.body.beatId },
      {
        $push: {
          comments: {
            commentId: req.body.commentId,
            byUser: req.body.userId,
            comment: req.body.comment,
          },
        },
      }
    );

    if (beat.acknowledged) {
      res.status(201).json({ status: 201, message: "Comment added" });
    } else {
      res.status(404).json({ status: 404, message: "Error" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

/*==================================
        Delete a comment on a beat
====================================*/
const deleteCommentBeat = async (req, res) => {
  const { id } = req.params;

  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const beat = await db.collection("beats").updateOne(
      { _id: req.body.beatId },
      {
        $pull: {
          comments: { commentId: id },
        },
      }
    );

    if (beat.acknowledged) {
      res.status(204).json({ status: 204, message: "Comment deleted" });
    } else {
      res.status(404).json({ status: 404, message: "Error" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};
/*==================================
         Like a beat by ID
====================================*/
const likeBeat = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const beat = await db
      .collection("beats")
      .updateOne(
        { _id: req.body._id },
        { $push: { likedBy: req.body.userId } }
      );

    if (beat.acknowledged) {
      res.status(200).json({ status: 200, message: "Like added" });
    } else {
      res.status(404).json({ status: 404, message: "Error" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

/*==================================
         Remove like a beat by ID
====================================*/
const removeLikeBeat = async (req, res) => {
  try {
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();

    const db = client.db("BeatMi");

    const beat = await db
      .collection("beats")
      .updateOne(
        { _id: req.body._id },
        { $pull: { likedBy: req.body.userId } }
      );

    if (beat.acknowledged) {
      res.status(200).json({ status: 200, message: "Like added" });
    } else {
      res.status(404).json({ status: 404, message: "Error" });
    }

    client.close();
  } catch (err) {
    res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = {
  saveBeat,
  getAllBeats,
  getBeat,
  deleteBeat,
  likeBeat,
  removeLikeBeat,
  getBeatsArtist,
  deleteAllBeatByUser,
  addCommentBeat,
  deleteCommentBeat,
  modifyBeat,
};
