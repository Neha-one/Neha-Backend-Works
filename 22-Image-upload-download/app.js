const session = require('express-session');
const express = require('express');
const bodyparser = require('body-parser');
const MongodbStore = require('connect-mongodb-session')(session);
const { storeRouter } = require("./routes/store");
const { hostRouter } = require("./routes/host");
const { default: mongoose } = require('mongoose');
const { authRouter } = require('./routes/auth');
const multer = require('multer');
const path = require('path')
const rootDir = require('./utils/path');

const MONG_PATH = "mongodb+srv://nehabaranwal841435_db_user:StayNest12345@algocluster.fje2ela.mongodb.net/StayNest?appName=algoCluster";

const app = express();


const store = new MongodbStore({
  uri: MONG_PATH,
  collection: 'sessions',
})

const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'photo') {
      cb(null, 'uploads/');
    } else if (file.fieldname === 'pdf') {
      cb(null, 'houseRule/');
    }
  },

  filename: (req, file, cb) => {
    cb(null, randomString(10) + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'photo') {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }

  else if (file.fieldname === 'pdf') {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
};


app.set("view engine", "ejs");
app.use(multer({
  storage: storage,
  fileFilter: fileFilter
}).fields([
  { name: 'photo', maxCount: 1 },
  { name: 'pdf', maxCount: 1 }
]));
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(rootDir, 'uploads')));
app.use("/houseRule", express.static(path.join(rootDir, 'houseRule')));
app.use("/host/uploads", express.static(path.join(rootDir, 'uploads')));

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
});
app.use("/host", hostRouter);

const PORT = 3000;

mongoose.connect(MONG_PATH).then(() => {
  console.log("Mongoose connected successfully.");
  app.listen(PORT, () => {
    console.log(`App starts at http://localhost:${PORT} `);
  });
}).catch(err => {
  console.log("Error while connecting to Mongoose :", err);
});