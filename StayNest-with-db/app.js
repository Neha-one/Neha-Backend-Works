const express = require('express');
const bodyparser = require('body-parser');
const { storeRouter } = require("./routes/store");
const { hostRouter } = require("./routes/host");
const db = require("./utils/database");

const app = express();
db.execute('SELECT * FROM `property-details`').then(
  ([rows,fields]) => {
    console.log(rows);
  }
).catch(error => {
  console.log('Error while reading table records', error);
})
app.use(express.urlencoded());
app.set("view engine", "ejs");
app.use(express.static("public"));
 
app.use(storeRouter);
app.use(hostRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App starts at http://localhost:${PORT} `);
}); 