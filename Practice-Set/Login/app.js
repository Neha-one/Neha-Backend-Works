const express = require('express');
const bodyparser = require('body-parser');
const { storeRouter } = require('./routes/store');
const { AuthRouter } = require('./routes/auth');
const session = require('express-session')

const MONG_PATH = "mongodb+srv://nehabaranwal841435_db_user:StayNest12345@algocluster.fje2ela.mongodb.net/StayNest?appName=algoCluster";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(express.urlencoded());

app.use(session({
  secret: "algoneha",
  resave: false,
  saveUninitialized: true,
}));

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn;
  next();
})

app.use(storeRouter);
app.use(AuthRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App starts at http://localhost:${PORT} `);
});
