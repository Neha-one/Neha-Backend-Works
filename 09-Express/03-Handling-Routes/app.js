const express = require('express')

const app = express();
const PORT = 3000;

//----- "/" this is global and run for every http request.
app.get("/", (req, res, next) => {
  console.log("hey its 1st middleware");
  next();
})

app.post("/details", (req, res, next) => {
  console.log("hey its 2nd middleware");
  res.send("<p>Welcome to my app</p>")
})

app.use("/", (req, res, next) => {
  console.log("hey its another middleware");
  next();
})

app.listen(PORT, () => {
  console.log(`server is running on address http://localhost${PORT}`)
})