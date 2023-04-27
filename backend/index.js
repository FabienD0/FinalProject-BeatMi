"use strict";

const express = require("express");
const morgan = require("morgan");
const passport = require("passport");
const {
  registerUser,
  getAllUsers,
  loginUser,
  getUser,
} = require("./auth/handlers");
const {
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
} = require("./handlersBeats");
const {
  changeAvatar,
  removeUser,
  likeBeatUser,
  removeLikeBeatUser,
  removeLikeBeatAllUser,
  getUserByBeatId,
  addBeatUser,
  removeBeatUser,
  getUserById,
  removeAvatar,
} = require("./handlerUsers");

const PORT = process.env.PORT || 8080;

require("./auth/config/passport")(passport);

express()
  .use(passport.initialize())
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST,PATCH,DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept,Authorization"
    );
    res.header(
      "Access-Control-Allow-Origin",
      "http://localhost:3000",
      "https://beatmi.onrender.com"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use("/", express.static(__dirname + "/"))
  /*====================
        Beats Endpoint 
   ====================*/
  .get("/api/getAllBeats", getAllBeats)
  .get("/api/getBeat/:id", getBeat)
  .get("/api/getBeatsArtist/:user", getBeatsArtist)
  .post("/api/saveBeat", saveBeat)
  .patch("/api/likeBeat", likeBeat)
  .patch("/api/removeLikeBeat", removeLikeBeat)
  .patch("/api/addCommentBeat", addCommentBeat)
  .patch(
    "/api/modifyBeat/:id",
    passport.authenticate("jwt", { session: false }),
    modifyBeat
  )
  .delete(
    "/api/deleteBeat/:id",
    passport.authenticate("jwt", { session: false }),
    deleteBeat
  )
  .delete(
    "/api/deleteAllBeatByUser",
    passport.authenticate("jwt", { session: false }),
    deleteAllBeatByUser
  )
  .delete(
    "/api/deleteCommentBeat/:id",
    passport.authenticate("jwt", { session: false }),
    deleteCommentBeat
  )
  /*====================
      Users Endpoint 
   ====================*/
  .post("/api/getUserById/:id", getUserById)
  .post("/api/getUserByBeatId/:id", getUserByBeatId)
  .post("/api/changeAvatar", changeAvatar)
  .post("/api/removeAvatar/", removeAvatar)
  .patch("/api/likeBeatUser", likeBeatUser)
  .patch("/api/removeLikeBeatuser", removeLikeBeatUser)
  .patch("/api/addBeatUser", addBeatUser)
  .patch(
    "/api/removeBeatUser",
    passport.authenticate("jwt", { session: false }),
    removeBeatUser
  )
  .patch(
    "/api/removeLikeBeatAllUser",
    passport.authenticate("jwt", { session: false }),
    removeLikeBeatAllUser
  )
  .delete(
    "/api/removeUser",
    passport.authenticate("jwt", { session: false }),
    removeUser
  )
  /*=======================
  Authentification Endpoint 
   ======================*/
  .get("/api/getAllUsers", getAllUsers)
  .post("/api/register", registerUser)
  .post("/api/login", loginUser)
  .get(
    "/api/getUser",
    passport.authenticate("jwt", { session: false }),
    getUser
  )

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
