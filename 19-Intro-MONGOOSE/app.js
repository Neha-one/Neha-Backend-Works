const express = require('express');
const bodyparser = require('body-parser');
const { storeRouter } = require("./routes/store");
const { hostRouter } = require("./routes/host");
const { default: mongoose } = require('mongoose');

const app = express();

app.use(express.urlencoded());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(storeRouter);
app.use(hostRouter);

const PORT = 3000;

const MONG_PATH = "mongodb+srv://nehabaranwal841435_db_user:StayNest12345@algocluster.fje2ela.mongodb.net/StayNest?appName=algoCluster";
mongoose.connect(MONG_PATH).then(() => {
  console.log("Mongoose connected successfully.");
  app.listen(PORT, () => {
    console.log(`App starts at http://localhost:${PORT} `);
  });
}).catch(err => {
  console.log("Error while connecting to Mongoose :", err);
});