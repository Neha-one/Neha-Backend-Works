const express = require('express')
const bodyparser = require('body-parser');
const { homeRouter } = require('./routes/store');
const { hostRouter } = require('./routes/host');

const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded());
app.use(homeRouter);
app.use(hostRouter);

app.use((req, res) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" })
});

const PORT = 3000;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on address http://localhost:${PORT}`)
});