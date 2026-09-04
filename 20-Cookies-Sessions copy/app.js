const session = require('express-session');
const express = require('express');
const bodyparser = require('body-parser');
const MongodbStore = require('connect-mongodb-session')(session);
const { storeRouter } = require("./routes/store");
const { hostRouter } = require("./routes/host");
const { default: mongoose } = require('mongoose');
const { authRouter } = require('./routes/auth');

const MONG_PATH = "mongodb+srv://nehabaranwal841435_db_user:StayNest12345@algocluster.fje2ela.mongodb.net/StayNest?appName=algoCluster";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

const store = new MongodbStore({
  uri: MONG_PATH,
  collection: 'sessions',
})

app.use(express.urlencoded());

app.use(session({
  secret: "AlgoNeha",
  resave: false,
  saveUninitialized: true,
  store
}));

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  res.locals.user = req.session.user;
  next();
})

app.use(authRouter);
app.use(storeRouter);

app.use("/host", (req, res, next) => {
  if (!req.isLoggedIn) {

    res.redirect("/login");
  }
  else {
    next();

  }
  app.use("/host", hostRouter);
});

const PORT = 3000;

mongoose.connect(MONG_PATH).then(() => {
  console.log("Mongoose connected successfully.");
  app.listen(PORT, () => {
    console.log(`App starts at http://localhost:${PORT} `);
  });
}).catch(err => {
  console.log("Error while connecting to Mongoose :", err);
});