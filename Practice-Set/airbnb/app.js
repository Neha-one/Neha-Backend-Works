//Core module
const path = require('path')

//External module
const express = require('express')

//local module:
const userRouter = require('./routes/userRouter')
const hostRouter = require('./routes/hostRouter')
const bodyParser = require('body-parser')
const rootDir = require('./utils/path')

const app = express();
app.use(express.urlencoded());

app.use(userRouter);
app.use("/host", hostRouter);

// error handling 404------
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'))
})
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on address http://localhost:${PORT}`)
})