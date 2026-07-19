//External module
const express = require('express');
const bodyParser = require('body-parser')

//Core moduel
const path = require('path')

//Local module
const contactRouter = require('./routes/contactUs')
const userRouter = require('./routes/user')
const rootDir = require('./utils/pathUtil')

const app = express();
// app.use(express.static(path.join(rootDir, 'public')))
//-----OR---------EASY--------
app.use(express.static('public'));

app.use(bodyParser.urlencoded());

app.use(userRouter)
app.use(contactRouter)


app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on address http://localhost:${PORT}`)
});