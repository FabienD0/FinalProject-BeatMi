const { Strategy } = require("passport-jwt");
const { ExtractJwt } = require("passport-jwt");
const { MONGO_URI } = process.env;
const { ObjectId } = require("mongodb");
const { MongoClient } = require("mongodb");
const fs = require("fs");
const path = require("path");

const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

const optionsDb = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const strategy = new Strategy(options, async (payload, done) => {
  const client = new MongoClient(MONGO_URI, optionsDb);
  await client.connect();

  const db = client.db("BeatMi");

  try {
    const userId = new ObjectId(payload.sub);
    const user = await db.collection("users").findOne({ _id: userId });

    if (user) {
      client.close();
      return done(null, user);
    } else {
      client.close();
      return done(null, false);
    }
  } catch (err) {
    client.close();
    return done(err, false);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
