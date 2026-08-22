const express = require('express');
const { storeRoute } = require("./routes/store");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(storeRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App starts at http://localhost:${PORT} `);
});