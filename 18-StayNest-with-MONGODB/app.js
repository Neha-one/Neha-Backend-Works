require("dotenv").config();
const express = require('express');
const bodyparser = require('body-parser');
const { storeRouter } = require("./routes/store");
const { hostRouter } = require("./routes/host");
const {mongoConnect} = require('./utils/database');

const app = express();

app.use(express.urlencoded());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(storeRouter);
app.use(hostRouter);

const PORT = 3000;
mongoConnect(client => {
app.listen(PORT, () => {
    console.log(`App starts at http://localhost:${PORT} `);
  })
}); 